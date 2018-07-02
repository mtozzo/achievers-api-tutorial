import React, { Component } from 'react';
import { Header, Dropdown } from 'semantic-ui-react'
import _ from 'lodash';
import { doUserSearch } from './apiMethods'; 
import './Recipients.css';

class Recipients extends Component {

  constructor(props) {
    super(props);
    this.handleRecipientsChange = this.handleRecipientsChange.bind(this);
  }

  componentWillMount() {
    this.setState({
      isFetching: false,
      multiple: true,
      search: true,
      searchQuery: '',
      value: [],
      options: [],
    })
  }

  handleRecipientsChange(e, { value }) {
    this.setState({ value });
    this.props.onRecipientsChange({ value });  
  }

  handleSearchChange = (e, { searchQuery }) => {
    const { accessToken } = this.props

    this.setState({ isFetching: true })

    doUserSearch(accessToken, searchQuery)
      .then(res => {
        const users = res.items.map((user) => { 
          return { key: user.id, text: user.fullName , image: { src: user.profileImageUrl }, value: user.id } 
        });

        this.setState((prev, props) => {
          const newOptions = _.uniqBy(users.concat(prev.options), 'key');
          return { isFetching: false, options: newOptions };
        });
      })
      .catch(err => {
        this.setState({ error: err, isLoading: false });
      });
  }

  render() {
    const renderLabel = label => ({
      content: label.text,
      image: label.image,
    })

    const { isFetching, options } = this.state

    return (
      <div className="recipients">
      <Header as="h2" content="Who do you want to recognize?" />
        <Dropdown
          fluid
          selection
          multiple
          search
          selection
          closeOnChange
          options={options}
          placeholder='Add more people'
          onSearchChange={this.handleSearchChange}
          disabled={isFetching}
          loading={isFetching}
          renderLabel={renderLabel} 
          onChange={this.handleRecipientsChange} />
      </div>
    );
  }
}
  
export default Recipients;
