export function getPictureUrl(originalURL: string | null) {
    if (!originalURL) {
      return null;
    }
  
    const transformation = "w_60,f_auto,q_auto";
  
    const parts = originalURL.split("/v");
  
    const newURL = `${parts[0]}/${transformation}/v${parts[1]}`;
  
    return newURL;
  }