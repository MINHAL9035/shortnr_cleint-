export interface LinkInterface {
  _id: string;
  userId: string;
  title: string;
  originalLink: string;
  shortenedLink: string; 
  qrCode: string;
  createdAt: string;
  clicks: number;
}
