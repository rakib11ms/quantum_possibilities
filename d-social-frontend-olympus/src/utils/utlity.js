import moment from "moment";
export function camelizeName(str) {
    return str?.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return word?.toUpperCase();
    }).replace(/\s+/g, ' ');
}

export function getFile(str) {
    return str && typeof (str) == 'string' ? str?.replace(/\\/g, '/') : ''
}
export function formatDate(timestamp) {
    const now = moment();
    const postTime = moment(timestamp);
    const diffMinutes = now.diff(postTime, "minutes");

    if (diffMinutes < 1) {
        return "a few seconds ago";
    } else if (diffMinutes < 30) {
        return `${diffMinutes} minutes ago`;
    } else if (now.isSame(postTime, "day")) {
        return `Today at ${postTime.format("LT")}`;
    } else {
        return postTime.format("LLL");
    }
}

export function isImage(filename) {
    if (typeof (filename) !== 'string') return false;
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'jfif'];
    const fileExtension = filename.split('.').pop().toLowerCase();
    return imageExtensions.includes(fileExtension);
}

export function isVideo(filename) {
    if (typeof (filename) !== 'string') return false;
    const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'mkv'];
    const fileExtension = filename.split('.').pop().toLowerCase();
    return videoExtensions.includes(fileExtension);
}
export function isValidHttpUrl(str) {
    if (typeof (str) !== 'string') return false;
    let url;

    try {
        url = new URL(str);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

export function timeFormat(time) {
    const relativeTime = moment(time).fromNow();
    return relativeTime;
    // console.log("bal amar", relativeTime)
}