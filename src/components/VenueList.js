import React, {Component} from 'react';
import ListItem from './ListItem';

//maps over list item data when click in ListView
export default class VenueList extends Component {
  render () {
    return (
      <ol className="venueList" aria-label="venues">

        {this.props.venues &&
          this.props.venues.map ((venue, index) => (
            <ListItem
              key={index}
              {...venue}
              handleListItemClick={this.props.handleListItemClick}
            />
          ))}
      </ol>
    );
  }
}
