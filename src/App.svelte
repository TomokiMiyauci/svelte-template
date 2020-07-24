<script>
  export let name
  const aa: number = 1
  const a = (aaa: HTMLDivElement) => {
    console.log(aaa)
  }
</script>

<main>
  <h1>Hello {name}!{aa}</h1>
  <p>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps.
  </p>
</main>

<style>
  main {
    max-width: 240px;
    padding: 1em;
    margin: 0 auto;
    text-align: center;
  }

  h1 {
    font-size: 4em;
    font-weight: 100;
    color: #ff3e00;
    text-transform: uppercase;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
