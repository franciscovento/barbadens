export interface ChannelResponse<T> {
  schema:           string;
  table:            string;
  commit_timestamp: Date;
  eventType:        string;
  new:              T;
  old:              T;
  errors:           null;
}
