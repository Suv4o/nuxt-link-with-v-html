const idsWithListeners = new Set<string>();

function generateUuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

function assignAnchorsIds(html: string) {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(html, "text/html");
    const anchors = doc.querySelectorAll("a");

    anchors.forEach((anchor) => {
        if (!anchor.hasAttribute("id")) {
            anchor.setAttribute("id", generateUuid());
        }
    });
    return doc.documentElement.outerHTML;
}

function convertAnchorToNuxtLink(html: HTMLElement) {
    const anchors = html.querySelectorAll("a");

    anchors.forEach((anchor) => {
        if (anchor.id && !idsWithListeners.has(anchor.id)) {
            const link = document.getElementById(anchor.id);

            link?.addEventListener("click", (event) => {
                event.preventDefault();
                const to = anchor.getAttribute("href");
                if (to) {
                    useNuxtApp().$router.push(to);
                }
            });

            // Add the ID to the Set
            idsWithListeners.add(anchor.id);
        }
    });
}

function removeListeners() {
    idsWithListeners.forEach((id) => {
        const link = document.getElementById(id);
        link?.removeEventListener("click", () => {});
        idsWithListeners.delete(id);
    });
}

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive("nuxtHtml", {
        mounted(el: HTMLElement, binding) {
            el.innerHTML = assignAnchorsIds(binding.value);
            convertAnchorToNuxtLink(el);
        },
        updated(el, binding) {
            el.innerHTML = assignAnchorsIds(binding.value);
            convertAnchorToNuxtLink(el);
        },
        unmounted() {
            removeListeners();
        },
    });
});
