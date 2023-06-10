export type UUID = string;

interface Image {
  _id: UUID;
  title: string;
  alt: string;
  height: string;
  width: string;
  createDate: string;
  source: string;
  credits: string;
}

interface Video {
  _id: UUID;
  summary: string;
  title: string;
  source: string;
  createDate: string;
  isAdsEnabled: boolean;
  author: string;
}

type Media = Image | Video;

export interface Content {
  _id: UUID;
  title: string;
  partnerId: UUID;
  description: string;
  originalUrl: string;
  publishDate: string;
  paragraph: string;
  // media: Media[]; // media can be image or video
}
