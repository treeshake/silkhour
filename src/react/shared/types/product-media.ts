export interface MediaImage {
  id: string;
  image: {
    url: string;
    altText: string | null;
    width: number;
    height: number;
  };
}

export interface Video {
  id: string;
  sources: {
    url: string;
    mimeType: string;
    format: string;
    height: number;
    width: number;
  }[];
}

export interface ExternalVideo {
  id: string;
  embedUrl: string;
}

export interface Model3d {
  id: string;
  sources: {
    url: string;
    mimeType: string;
    format: string;
  }[];
  previewImage: {
    url: string;
  };
}

// export type Media = MediaImage | Video;
export type Media = MediaImage;
