import React from 'react';

class ColorSwitcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: this.props.firstColor || 'orange',
    };
  }

  handleClick = () => {
    const { color } = this.state;
    const { firstColor = 'orange', secondColor = 'white' } = this.props;
    this.setState(() => ({
      color: color === firstColor ? secondColor : firstColor,
    }));
  };

  render() {
    const { color } = this.state;
    return (
      <button
        style={{ background: color }}
        onClick={this.handleClick}
      >
        Switch Color
      </button>
    );
  }
}

export default ColorSwitcher;
