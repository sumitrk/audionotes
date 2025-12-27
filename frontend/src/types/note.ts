export type Note = {
  id: string;
  title: string;
  body: string;
  created_at: string;
  duration?: number;
  tags?: string[];
  is_favourite?: boolean;
  status?: "uploading" | "processing" | "ready" | "error";
};
