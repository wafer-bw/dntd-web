export const textController = {
    escape: escape,
    clean: clean,
}

function escape(unsafe: string): string {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
}

function clean(content: string): string {
    return content.toLowerCase()
}
