<script>
  export let src = "/img/avatar.svg";
  export let alt = "";
  export let small = false;
</script>

<img {src} width="48" height="48" {alt} loading="lazy" class:small />

<style>
  img {
    height: 48px;
    width: 48px;
    border-radius: 50%;
    object-fit: cover;
    filter: var(--shadow-md);
  }

  img.small {
    height: 24px;
    width: 24px;
  }
</style>
