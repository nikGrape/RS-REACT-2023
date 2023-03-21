import { Component, ReactNode } from 'react';

export interface PagePropsType {
  updateLocation: (location: string, topic?: string) => void;
}

export abstract class Page extends Component<PagePropsType> {
  constructor(props: PagePropsType, location: string, topic?: string) {
    super(props);
    props.updateLocation(location, topic);
  }

  abstract render(): ReactNode;
}
