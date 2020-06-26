import React from 'react';
import $ from 'jquery';
//url for the api
var url = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
//my initial quote that I wanted to display
var quote = "Quotes help us understand, inspire, motivate, clarify and show our approach to things around, this is why people and I love quotes."
var author = " — Takyou Allah Cheikh Malaynine"
//my arr of colors
var arr = ['D33F49','D7C0D0','53A2BE','74226C','262730', '3A405A', '1A281F', 'C17C74', 'DDC9B4', '4B4E6D','84DCC6', '95A3B3', 'C7EFCF','F0B67F','FE5F55','D6D1B1','B9CDDA','6B7D7D']
var randomColor = arr[Math.floor(Math.random()*arr.length)]
console.log(randomColor)
console.log(quote)


 //$("body").append("<code>" + JSON.stringify(data, null, '<br/>') + "</code>");

//share button for twitter
$(document).ready(function(){$('#tweet-quote').click(function() {
  $(this).attr("href", 'https://twitter.com/intent/tweet?text=' + quote + author);
})});

const styles = {
  transition: 'opacity 1s ease-out'
}

function animateIn(){
  if($('#quote-div').hasClass('transition2') ){
    return $("#quote-div").removeClass('transition2').addClass('transition')

}else if($('#quote-div').hasClass('transition') ){
  return $("#quote-div").removeClass('transition').addClass('transition3')

}else if($('#quote-div').hasClass('transition3')){
  return $("#quote-div").removeClass('transition3').addClass('transition')

}
}











class Homepage extends React.Component  {
//set up
  constructor(props) {
    super(props);
    this.state = {
      name: quote,
      author: author,
      color: arr[Math.floor(Math.random()*arr.length)]
    }
    this.handleClick = this.handleClick.bind(this);
  }



//on click this will call the api with random quotes, and then set the states accordingly.
   handleClick()  {
    animateIn()
    $.getJSON(url, function(data){
    console.log(data);
    this.setState({
      name: data.quoteText,
      author: " — " +  data.quoteAuthor,
      color: arr[Math.floor(Math.random()*arr.length)]
    })
    quote = data.quoteText
    author = this.state.author
    if (author == " — "){
      this.setState({
        author: " — Unknown"
      })
    }
  }.bind(this))


console.log(quote)
}
  render(){
  return (

    <div className = "container-fluid" >
      {/*<h1 id = "title"> Random Quote Machine </h1>*/}

      <div className = "container-fluid transition2" id = "quote-div">
        <p id="quote"style = {{color: "#" + this.state.color}} >{this.state.name}</p>
        <p id = "author" style = {{color: "#" + this.state.color}}>{this.state.author} </p>
        <div className = "row" id="button">
          <div id="twitter" >
            <a id = "tweet-quote" class="btn btn-block btn-social btn-twitter align-text-top twitter-share-button" href = "https://twitter.com/intent/tweet?text=" target= "_blank">
              <span class="fa fa-twitter fa-2x"></span> Share
            </a>
          </div>
          <div id="wrapper" className = "vertical-align">
            <button onClick={this.handleClick} style = {{backgroundColor:'#' + this.state.color}} className = "btn btn-primary shadow-none" id = "new-quote">New Quote</button>
          </div>
        </div>
      </div>


    </div>

  );
}
}

export default Homepage;
//
