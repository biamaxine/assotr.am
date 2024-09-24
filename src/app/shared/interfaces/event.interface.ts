export interface Event {
  id: string;
  title: {
    full: string;
    resume: string;
  };
  date: string;
  pictures: string[];
  context: string[];
  tag: string;
}
