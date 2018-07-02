import React, { Component } from 'react';
import { Accordion, Icon, Header, Image } from 'semantic-ui-react'
import './Modules.css';

class Modules extends Component {
  constructor(props) {
    super(props);
    this.handleCriterionClick = this.handleCriterionClick.bind(this);
    this.state = {
      activeModuleIndex: -1,
      activeCriterionIndex: -1,
    }
  } 

  handleCriterionClick = (e, titleProps) => {
    const { index, criteriaid } = titleProps
    const { activeCriterionIndex } = this.state
    const newIndex = activeCriterionIndex === index ? -1 : index
    this.props.onModuleCriterionChange(criteriaid);
    this.setState({ activeCriterionIndex: newIndex })
  }

  handleModuleClick = (e, titleProps) => {
    const { index } = titleProps
    const { activeModuleIndex } = this.state
    const newIndex = activeModuleIndex === index ? -1 : index

    this.setState({ activeModuleIndex: newIndex, activeCriterionIndex: -1 })
  }

  RenderModule(module, i) {
    const { activeModuleIndex } = this.state;
    const criteriaItems = module.criteria.map((criterion, i) => this.RenderCriteria(criterion, i));

    return (
      <div key={module.id}>
        <Accordion.Title active={activeModuleIndex === i} index={i} onClick={this.handleModuleClick} className="module-wrapper">
        <div className="module-image">
          <Image src={module.bannerURL} size='small' /> 
        </div>
        <div className="module-info">
          <Header>
            {module.name} <Icon name='dropdown' />
          </Header>
          <div dangerouslySetInnerHTML={{__html: module.description}} />
        </div>
        </Accordion.Title>
        <Accordion.Content active={activeModuleIndex === i}>
          <Accordion fluid>
            {criteriaItems}
          </Accordion>
        </Accordion.Content>
      </div>
    )
  }

  RenderCriteria(criterion, j) {
    const { activeCriterionIndex } = this.state;

    return (
      <div key={criterion.id}>
        <Accordion.Title active={activeCriterionIndex === j} index={j} criteriaid={criterion.id} onClick={this.handleCriterionClick} content={criterion.name} />
        <Accordion.Content active={activeCriterionIndex === j}>
          <div className="criterion-wrapper">
            <div className="criterion-image">
              <Image src={criterion.criterionBannerUrl} size="small" /> 
            </div>
            <div className="criterion-info" dangerouslySetInnerHTML={{__html: criterion.description}} />
          </div>
        </Accordion.Content>
      </div>
    )
  }

  render() {
    const { modules } = this.props;
    const moduleItems = modules.map((module, i) => this.RenderModule(module, i));

    return (
      <div className="modules">
        <Header as="h2" content="Choose a recognition type" />
        <Accordion fluid>
          {moduleItems}
        </Accordion>
      </div>
    )
  }
}
  
export default Modules;
