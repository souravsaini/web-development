import React from "react";


class MemeGenerator extends React.Component {
  constructor() {
    super()
    this.state = {
      topText: "",
      bottomText: "",
      randomImage: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(res => {
      const { memes } = res.data;
      this.setState({
        ...this.state,
        allMemeImgs: memes
      })
    })
    .catch(err => console.log(err))
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    });
  }

  handleClick(event) {
    event.preventDefault();
    const randomImage = Math.floor(Math.random() * this.state.allMemeImgs.length);
    console.log(randomImage);
    this.setState({
      ...this.state,
      randomImage: this.state.allMemeImgs[randomImage].url
    });
  }

  render() {
    return (
      <div>
        <form className="meme-form">
          <input type="text" name="topText" value={this.state.topText} placeholder="Top text"
            onChange={this.handleChange} />
          <input type="text" name="bottomText" value={this.state.bottomText} placeholder="Bottom text"
            onChange={this.handleChange} />
          <button onClick={this.handleClick}>Gen</button>
        </form>

        <div className="meme">
          <img src={this.state.randomImage} alt="random" />
          <h2 className="top"> {this.state.topText} </h2>
          <h2 className="bottom"> {this.state.bottomText} </h2>
        </div>
      </div>
    )
  }
}

export default MemeGenerator;
