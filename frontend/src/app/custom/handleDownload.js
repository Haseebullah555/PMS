export default async function handleDownload(value) {
  if (value.attachment) {
    const api_route = process.env.REACT_APP_API_PUBLIC_URL;
    const fileUrl = api_route + value.attachment;

    try {
      const response = await fetch(fileUrl, {
        method: 'GET',
        headers: {
          // Add headers if needed (like Authorization)
        },
      });

      if (!response.ok) {
        throw new Error('File not found');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = value.file_name || 'file';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  }
}


// export default function handleDownload(value) {
//   if (value.attachment) {
//     const fileUrl = 'http://127.0.0.1:8000/storage/all_files/' + value.attachment

//     fetch(fileUrl)
//       .then((response) => response.blob())
//       .then((blob) => {
//         console.log(blob)
//         const url = window.URL.createObjectURL(blob)
//         const link = document.createElement('a')
//         link.href = url
//         link.download = value.file_name || 'file'
//         link.target = '_blank'
//         link.rel = 'noopener noreferrer'
//         link.click()
//         window.URL.revokeObjectURL(url)
//       })
//       .catch((error) => {
//         console.error('Error downloading the file:', error)
//       })
//   }
// }
