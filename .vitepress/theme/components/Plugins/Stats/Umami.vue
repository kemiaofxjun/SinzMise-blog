

<script setup>
import { onMounted } from "vue";
const { theme } = useData();

onMounted(() => {
    const script = document.createElement("script")
    script.async = true
    script.src = theme.value.status.umami.src
    script.dataset.websiteId = theme.value.status.umami.id
    document.head.appendChild(script)
})
</script>