<script>
    import { page } from '$app/state';
    import NASA_TLX_Survey from '$lib/surveys/survey_NASA-TLX.svelte';

    const condition = $derived (
        page.url.searchParams.get('condition')
    );

</script>

<NASA_TLX_Survey {condition}/>