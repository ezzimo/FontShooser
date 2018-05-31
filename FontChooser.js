class FontChooser extends React.Component {
  constructor(props) {
      super(props);
      var currsize ;
      var currmin ;
      var currmax ;
      var color;
      var checked = (this.props.bold === 'true');
      if ( parseInt(this.props.min)  <  parseInt(this.props.max) ) {
        currmin = parseInt(this.props.min);
        currmax = parseInt(this.props.max);
        if ((parseInt(this.props.size) > parseInt(this.props.max)) && (parseInt(this.props.min) > 0)) {
          currsize = parseInt(this.props.max);
        } else if ((parseInt(this.props.size) < parseInt(this.props.min)) && (parseInt(this.props.min) > 0)) {
          currsize = parseInt(this.props.min);
        } else if ((parseInt(this.props.size) > parseInt(this.props.max)) && (parseInt(this.props.min) <= 0)) {
          currsize = parseInt(this.props.max);
          currmin = 1;
        } else if ((parseInt(this.props.size) < parseInt(this.props.min)) && (parseInt(this.props.min) <= 0)) {
          currsize = 1;
          currmin = 1;
        } else if ((parseInt(this.props.size) >= parseInt(this.props.min)) && (parseInt(this.props.size) <= parseInt(this.props.max))){
          currsize = parseInt(this.props.size);
        }
      } else if (parseInt(this.props.min) >= parseInt(this.props.max)) {
        currmin = parseInt(this.props.min);
        currmax = parseInt(this.props.min);
        currsize = parseInt(this.props.min);
      }

      if ((parseInt(this.props.size) === parseInt(this.props.min)) || (parseInt(this.props.size) === parseInt(this.props.max))) {
        color = 'red';
      } else {
        color = 'black';
      }

      console.log(this.props)
      this.state = { hidden: true, checked, color, currmax, currmin, currsize};
      this.handleClick = this.handleClick.bind(this);
      this.handleDoubleClick = this.handleDoubleClick.bind(this);
      this.handleCheck = this.handleCheck.bind(this);
      this.incrementSize = this.incrementSize.bind(this);
      this.decrementSize = this.decrementSize.bind(this);
      console.log(this.state);
    }

    handleClick(){
      this.setState({hidden: !this.state.hidden})
    };


    handleCheck() {
      this.setState({checked: !this.state.checked})
    };

    incrementSize() {
      if (this.state.currsize < (this.state.currmax -1)) {
        this.setState({ currsize: this.state.currsize + 1 });
        this.setState({ color : 'black' })
      } else if (this.state.currsize == (this.state.currmax -1)) {
        this.setState({ currsize: this.state.currsize + 1 });
        this.setState({ color : 'red' })
      }
    };

    decrementSize() {
      if (this.state.currsize > (this.state.currmin +1)) {
        this.setState({ currsize: this.state.currsize - 1 });
           this.setState({ color : 'black' })
      } else if (this.state.currsize == (this.state.currmin+1)) {
        this.setState({ currsize: this.state.currsize - 1 });
        this.setState({ color : 'red' })
      }
    };
     handleDoubleClick() {
       this.setState( { color : (this.state.color == 'red' ? 'black' : 'red') } );
       this.setState ({ currsize: parseInt(this.props.size) });
     };

    render() {
      var fontBold = this.state.checked ? 'bold' : 'normal';
      var color = this.state.color;
	return(
	       <div>
	       <input type="checkbox" id="boldCheckbox" checked={this.state.checked} onChange={this.handleCheck} hidden={ !this.state.hidden ? false : true}/>
         <button id="decreaseButton" onClick = { this.decrementSize.bind(this) } hidden={ !this.state.hidden ? false : true} style= {{ color: this.state.color, fontWeight: fontBold}}>-</button>
	       <span id="fontSizeSpan" onDoubleClick={this.handleDoubleClick} hidden={ !this.state.hidden ? false : true} style= {{ color: this.state.color, fontWeight: fontBold}}>{this.state.currsize}</span>
	       <button id="increaseButton" onClick = { this.incrementSize.bind(this) } hidden={ !this.state.hidden ? false : true} style= {{ color: this.state.color, fontWeight: fontBold}}>+</button>
	       <span id="textSpan" onClick={this.handleClick} onDoubleClick={this.handleDoubleClick} style= {{ color: this.state.color, fontWeight: fontBold, fontSize: this.state.currsize }}>{this.props.text}</span>
	       </div>
	);
    }
}
