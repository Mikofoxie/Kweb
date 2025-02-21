
export async function fetchVideos() {  
    const endpoint = 'https://us-west-2.cdn.hygraph.com/content/cm7dhcrgp00lp07w2l55jii50/master';
  
    const query = `
      query AllVideos {
        videos {
          id
          title
          slug
          nameArtist
          linkEmbed
          imageEmbed {
            url
          }
          descCredit
          descAbout
          thumbnail {
            url (
                transformation: {
                    image: { resize: {width: 640, height: 360, fit: crop} }
                }
            )
          }
          imagePreview {
            url (
                transformation: {
                    image: { resize: {width: 960, height: 540, fit: clip} }
                }
            )
          }
          category {
            name
            visibility
          }
        }
      }
    `;
  
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
  
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
  
      const json = await response.json();
      return json.data.videos;
    } catch (error) {
      console.error('Error when fetch videos:', error);
      return [];
    }
  }
  