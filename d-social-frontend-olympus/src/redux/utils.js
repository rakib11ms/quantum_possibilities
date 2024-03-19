export function createFormData(data) {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  });

  return formData;
}

export function savePostFormData(data) {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    if (Array.isArray(data[key])) {
      data[key].forEach((file) => {
        console.log("file__", file);
        if (typeof (file) !== 'object') {
          formData.append(`${key}[]`, file)
        }
        else {
          formData.append(key, file);
        }
      });
    } else {
      formData.append(key, data[key]);
    }
  });
  return formData;
}

export function renderStringWithLink(inputString) {
  if (inputString != "" && inputString != null) {
    // const urlRegex = /(https?:\/\/[^\s]+)/;
    const urlRegex = /(https?:\/\/[^\s]+)/g;

    const matches = inputString.match(urlRegex);
    // const link = match && match[0];
    let html = "";

    if (matches) {
      let lastIndex = 0;

      // Wrap each URL with <a> tags
      matches.forEach((match) => {
        const startIndex = inputString.indexOf(match, lastIndex);
        const preMatchText = inputString.substring(lastIndex, startIndex);
        html += `${preMatchText}<a class="post-link-comment" href="${match}">${match}</a>`;
        lastIndex = startIndex + match.length;
      });

      // Append any remaining text after the last URL
      html += inputString.substring(lastIndex);
    } else {
      // No link found, display the original string
      html = `${inputString}`;
    }

    return { __html: html };
  } else {
    return { __html: inputString };
  }
}
