let commentIndex = 1;
showComments(commentIndex);

function plusComments(n) {
  showComments(commentIndex += n);
}

function currentComment(n) {
  showComments(commentIndex = n);
}

function showComments(n) {
  let i;
  let comments = document.getElementsByClassName("customer-comments");
  let dots = document.getElementsByClassName("dot");
  if (n > comments.length) {
    commentIndex = 1;
  } else if (n < 1) {
    commentIndex = comments.length;
  }
  for (i = 0; i < comments.length; i++) {
    comments[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  comments[commentIndex-1].style.display = "block";  
  dots[commentIndex-1].className += " active";
}

