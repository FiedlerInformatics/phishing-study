#!/usr/bin/env bash
# =============================================================================
#  setup-zorin.sh – installiert alle Abhängigkeiten für "phishing-study"
#  Ziel: Zorin OS 17/18 (Ubuntu 22.04/24.04-Basis), z. B. ThinkPad T16 Gen 5
#
#  Aufruf (im geklonten Repo-Ordner, als normaler Benutzer – NICHT mit sudo):
#      bash setup-zorin.sh                # Repo = aktueller Ordner
#      bash setup-zorin.sh ~/Projekte/phishing-study
#
#  Optionen (Umgebungsvariablen):
#      NODE_MAJOR=22          Node.js-Hauptversion (Standard 22, wie auf dem Fedora-Rechner)
#      WITH_PUPPETEER=1       Chrome für Puppeteer herunterladen (nur für scripts/snapshot.js nötig)
#
#  Das Skript ist idempotent: Es kann gefahrlos mehrfach ausgeführt werden.
# =============================================================================
set -euo pipefail

NODE_MAJOR="${NODE_MAJOR:-22}"
WITH_PUPPETEER="${WITH_PUPPETEER:-0}"
REPO_DIR="$(cd "${1:-.}" && pwd)"

# ---------- Hilfsfunktionen -------------------------------------------------
info() { printf '\n\033[1;34m==> %s\033[0m\n' "$*"; }
ok()   { printf '\033[1;32m  ✔ %s\033[0m\n' "$*"; }
warn() { printf '\033[1;33m  ! %s\033[0m\n' "$*"; }
die()  { printf '\033[1;31m  ✘ %s\033[0m\n' "$*" >&2; exit 1; }

# ---------- Vorabprüfungen --------------------------------------------------
info "Vorabprüfungen"

if [[ $EUID -eq 0 ]]; then
  if [[ "${ALLOW_ROOT:-0}" != 1 ]]; then
    die "Bitte NICHT als root/mit sudo starten. Das Skript fragt selbst nach dem sudo-Passwort.
     (Sonst gehören node_modules und .venv root und du kannst sie später nicht ändern.)"
  fi
  SUDO=""
else
  command -v sudo >/dev/null || die "sudo ist nicht installiert."
  SUDO="sudo"
fi

. /etc/os-release
if [[ "${ID}" != "zorin" && "${ID}" != "ubuntu" && "${ID_LIKE:-}" != *ubuntu* ]]; then
  die "Dieses Skript ist für Zorin OS/Ubuntu gedacht (gefunden: ${PRETTY_NAME})."
fi
ok "System: ${PRETTY_NAME}"

[[ -f "$REPO_DIR/package.json" && -f "$REPO_DIR/frontend/package.json" && -f "$REPO_DIR/backend/requirements.txt" ]] \
  || die "$REPO_DIR sieht nicht nach dem phishing-study-Repo aus (package.json/frontend/backend fehlen)."
ok "Repo: $REPO_DIR"

if git -C "$REPO_DIR" rev-parse --git-dir >/dev/null 2>&1; then
  BRANCH="$(git -C "$REPO_DIR" branch --show-current)"
  ok "Git-Branch: ${BRANCH:-<detached>} @ $(git -C "$REPO_DIR" rev-parse --short HEAD)"
  [[ "$BRANCH" == "main" ]] && warn "Du bist auf 'main'. Der aktuelle Stand (DB/API) liegt auf 'api-connection'."
fi

# ---------- 1. Systempakete ------------------------------------------------
info "1/5 Systempakete (apt)"
$SUDO apt-get update
# build-essential + python3: Fallback, falls better-sqlite3 kein fertiges Binary findet und kompilieren muss
# bluez/rfkill:              Bluetooth-Stack für den Polar-Brustgurt (bleak nutzt BlueZ über D-Bus)
# sqlite3:                   Kommandozeile, um frontend/data/study.db anzusehen
$SUDO env DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
  git curl ca-certificates gnupg \
  build-essential python3 python3-venv python3-pip python3-dev \
  bluez rfkill sqlite3
ok "Systempakete installiert"

# ---------- 2. Node.js (NodeSource) ----------------------------------------
# Ubuntu/Zorin liefert ein zu altes Node.js. Vite 8 braucht >= 20.19 bzw. >= 22.12.
info "2/5 Node.js ${NODE_MAJOR}.x"
current_major=0
if command -v node >/dev/null; then
  current_major="$(node -p 'process.versions.node.split(".")[0]')"
fi

if (( current_major >= NODE_MAJOR )); then
  ok "Node.js $(node -v) ist bereits vorhanden"
else
  # Offizielle Paketquelle mit signiertem Schlüssel einrichten (statt 'curl | sudo bash')
  $SUDO install -d -m 0755 /etc/apt/keyrings
  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key \
    | $SUDO gpg --dearmor --yes -o /etc/apt/keyrings/nodesource.gpg
  echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_${NODE_MAJOR}.x nodistro main" \
    | $SUDO tee /etc/apt/sources.list.d/nodesource.list >/dev/null
  # NodeSource-Pakete vor den (älteren) Ubuntu-Paketen bevorzugen
  printf 'Package: nodejs\nPin: origin deb.nodesource.com\nPin-Priority: 600\n' \
    | $SUDO tee /etc/apt/preferences.d/nodesource >/dev/null
  $SUDO apt-get update
  $SUDO apt-get install -y nodejs
  ok "Node.js $(node -v) / npm $(npm -v) installiert"
fi

# ---------- 3. Bluetooth ---------------------------------------------------
info "3/5 Bluetooth für den Polar-Gurt"
if [[ -d /run/systemd/system ]]; then
  $SUDO systemctl enable --now bluetooth || warn "bluetooth-Dienst konnte nicht gestartet werden"
  $SUDO rfkill unblock bluetooth || true
  if [[ $EUID -ne 0 ]] && ! id -nG "$USER" | grep -qw bluetooth; then
    $SUDO usermod -aG bluetooth "$USER" && warn "Zur Gruppe 'bluetooth' hinzugefügt – wirkt nach Ab-/Anmelden."
  fi
  ok "Bluetooth-Dienst aktiv"
else
  warn "Kein systemd gefunden (Container?) – Bluetooth-Einrichtung übersprungen."
fi

# ---------- 4. Python-Backend (venv) ---------------------------------------
# Ubuntu 24.04 / Zorin 18 verbietet 'pip install' ins System-Python (PEP 668).
# Darum eine virtuelle Umgebung in backend/.venv.
info "4/5 Python-Backend (bleak, websockets) in backend/.venv"
VENV="$REPO_DIR/backend/.venv"
[[ -x "$VENV/bin/python" ]] || python3 -m venv "$VENV"
"$VENV/bin/python" -m pip install --upgrade pip --quiet
"$VENV/bin/python" -m pip install -r "$REPO_DIR/backend/requirements.txt"
"$VENV/bin/python" -c 'import bleak, websockets; print("    bleak", bleak.__version__ if hasattr(bleak,"__version__") else "ok", "| websockets", websockets.__version__)'
ok "Python-Abhängigkeiten installiert"

# .venv lokal von Git ausschließen, ohne die .gitignore im Repo zu ändern
if git -C "$REPO_DIR" rev-parse --git-dir >/dev/null 2>&1; then
  EXCLUDE="$(git -C "$REPO_DIR" rev-parse --git-path info/exclude)"
  [[ "$EXCLUDE" = /* ]] || EXCLUDE="$REPO_DIR/$EXCLUDE"
  mkdir -p "$(dirname "$EXCLUDE")"
  grep -qxF 'backend/.venv/' "$EXCLUDE" 2>/dev/null || echo 'backend/.venv/' >> "$EXCLUDE"
fi

# ---------- 5. npm-Pakete ---------------------------------------------------
# 'npm ci' installiert exakt die Versionen aus package-lock.json (reproduzierbar).
info "5/5 npm-Pakete (Root + frontend)"
if [[ "$WITH_PUPPETEER" == 1 ]]; then
  unset PUPPETEER_SKIP_DOWNLOAD
else
  export PUPPETEER_SKIP_DOWNLOAD=1   # spart ~300 MB Chrome-Download; nur für scripts/snapshot.js nötig
fi

npm_install() {   # $1 = Ordner
  if [[ -f "$1/package-lock.json" ]]; then
    npm ci --prefix "$1" --no-audit --no-fund
  else
    npm install --prefix "$1" --no-audit --no-fund
  fi
}
npm_install "$REPO_DIR"            # concurrently, puppeteer
npm_install "$REPO_DIR/frontend"   # SvelteKit, Vite, better-sqlite3

# Native Module prüfen (better-sqlite3 muss zu dieser Node-Version passen)
( cd "$REPO_DIR/frontend" && node -e '
    const D = require("better-sqlite3");
    const v = new D(":memory:").prepare("select sqlite_version() v").get().v;
    console.log("    better-sqlite3 ok, SQLite", v);' )
ok "npm-Pakete installiert"

# ---------- Fertig ----------------------------------------------------------
info "Fertig! So startest du die Studie:"
cat <<EOF

    cd "$REPO_DIR"
    source backend/.venv/bin/activate
    npm run dev

  Frontend: http://localhost:5173    Herzfrequenz-Backend: ws://localhost:8765
  (Polar-Gurt anlegen/befeuchten, damit er sich per Bluetooth meldet.)

EOF
if git -C "$REPO_DIR" rev-parse --git-dir >/dev/null 2>&1 && [[ -n "$(git -C "$REPO_DIR" status --porcelain)" ]]; then
  warn "git status zeigt Änderungen nach der Installation (vermutlich wegen eingecheckter node_modules)."
  warn "Siehe Abschnitt 'Aufräumen' in der Anleitung."
fi
