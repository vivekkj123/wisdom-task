interface APIresponse{
  count: number;
  next: string;
  previous: null;
  results: {
    id: number;
    title: string;
    channel: {
      id: number;
      creator: {
        id: number;
        name: string;
        about: string;
        logo: string;
      };
      channel_name: string;
      about: string;
      subscriber_count: number,
      logo: string;
    };
    type: string;
    source: string;
    resource_link: string;
    thumbnail: null;
    image: null;
    raw_resource: null;
    view_count: number;
    video_id: string;
  }[];
};
