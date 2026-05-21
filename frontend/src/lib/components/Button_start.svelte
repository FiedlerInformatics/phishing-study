<script>
	let buttonProps = {
	class:[$$restProps.class]
	}

	function log() {
		console.log("clicked")
	}

</script>
	<button on:click = {log}
			on:mouseover
			on:mouseenter
			on:mouseleave
		{...buttonProps}>
			<slot/>
	</button>

<style>

	.danger {
		color:black;
        border-radius: 20px;
        padding: 20px;
	}

    :hover.danger {
        background-color: lightgrey;
        border-color: black;
    }

	.sm {
		font-size:1em;
		padding:0.1em;
	}
	.lg {
		font-size:1.5em
	}

</style>