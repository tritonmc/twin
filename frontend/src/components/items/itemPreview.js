import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Card, CardPrimaryAction } from "@rmwc/card";
import { GridCell } from "@rmwc/grid";
import { List } from "immutable";
import { setActiveItem } from "../../actions/items";

class ItemPreview extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.open(this.props.id);
  }

  render() {
    var { title, description } = this.props;
    return (
      <GridCell desktop="3" tablet="2" phone="4" className="item-preview">
        <Card>
          <CardPrimaryAction onClick={this.onClick}>
            <span className="title">{title}</span>
            <span className="description">
              {description ? (
                description instanceof List ? (
                  <SignDescription description={description} />
                ) : (
                  description
                )
              ) : (
                <i>Empty</i>
              )}
            </span>
          </CardPrimaryAction>
        </Card>
      </GridCell>
    );
  }
}

class SignDescription extends PureComponent {
  render() {
    var { description } = this.props;
    return (
      <React.Fragment>
        {description.get(0, <i>Empty</i>)}
        <br />
        {description.get(1, <i>Empty</i>)}
        <br />
        {description.get(2, <i>Empty</i>)}
        <br />
        {description.get(3, <i>Empty</i>)}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = { open: setActiveItem };

export default connect(
  null,
  mapDispatchToProps
)(ItemPreview);
