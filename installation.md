# Installation and Setup

[Fedora](#linux-fedora)<br>
[Ubuntu](#linux-ubuntu)<br>
[Windows 11](#windows-11)<br>

# Linux Fedora

## Clone or download the code
Clone the code with the following git-command and chante the directory:
```
sudo dnf install git
git clone https://github.com/FiedlerInformatics/phishing-study.git
cd phishing-study
```
Alternatively, the source code can be dowloaded as a `zip`-file via `code` -> `download ZIP`.

## Install dependencies
```
sudo dnf upgrade --refresh
sudo dnf install nodejs npm
```
### Check the version
```
node -v
npm -v
```
Change directory and then install `package.json` dependencies with npm:
```
npm install
```

## Start the server and open the app on localhost
```
npm run dev
```
And then open the localhost showed in the terminal.
Usually it is:
```
http://localhost:3000
```


# Linux Ubuntu
# Windows 11
