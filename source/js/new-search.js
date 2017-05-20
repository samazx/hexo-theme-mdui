window.addEventListener('load', function () {
  var searchBtn = document.querySelector("#search-btn");
  var search = document.querySelector("#search");
  var toolbar = document.querySelector("#search > div");
  var mode = 'idle';
  var open = false;
  function fixAtTop() {
    if (open) return;
    var sTop = document.body.scrollTop;
    var sLeft = document.body.scrollLeft;
    var top = search.offsetTop - sTop;
    var left = search.offsetLeft - sLeft;
    var width = search.offsetWidth;
    var height = search.offsetHeight;
    toolbar.style.height = height + 'px';
    toolbar.style.width = width + 'px';
    toolbar.style.position = 'fixed';
    toolbar.style.top = top + 'px';
    toolbar.style.left = left + 'px';
    open = true;
    setTimeout(function() {
      toolbar.classList.add('fixedTop');
      toolbar.style.height = '';
      toolbar.style.width = '';
      toolbar.style.position = '';
      toolbar.style.top = '';
      toolbar.style.left = '';
    },10)
  }
  function disFixAtTop () {
    if (!open) return;
    var sTop = document.body.scrollTop;
    var sLeft = document.body.scrollLeft;
    var top = search.offsetTop;
    var left = search.offsetLeft;
    var width = search.offsetWidth;
    var height = search.offsetHeight;
    var nowTop = sTop;
    var nowLeft = sLeft;
    var nowWidth = toolbar.offsetWidth;
    var nowHeight = toolbar.offsetHeight;
    toolbar.style.height = nowHeight + 'px';
    toolbar.style.width = nowWidth + 'px';
    toolbar.style.top = nowTop + 'px';
    toolbar.style.position = 'absolute';
    toolbar.style.left = nowLeft + 'px';
    toolbar.classList.remove('fixedTop');
    open = false;
    setTimeout(function() {
      toolbar.style.transition = 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
      toolbar.style.height = height + 'px';
      toolbar.style.width = width + 'px';
      toolbar.style.top = top + 'px';
      toolbar.style.position = 'absolute';
      toolbar.style.left = left + 'px';
    },10)
    setTimeout(function() {
      toolbar.style.height = '';
      toolbar.style.width = '';
      toolbar.style.position = '';
      toolbar.style.top = '';
      toolbar.style.left = '';
      toolbar.style.transition = '';
    },450)
  }
  searchBtn.addEventListener('click', function() {
    fixAtTop();
    mode = 'ctrl';
  })
  window.addEventListener('scroll', function() {
    if (mode === 'idle') {
      var sTop = document.body.scrollTop;
      var top = search.offsetTop - sTop;
      if (!open && top < 0) {
        fixAtTop();
      } else if (open && top > 0) {
        disFixAtTop();
      }
    }
  })
  var searchBar = {
    fixAtTop: fixAtTop,
    disFixAtTop: disFixAtTop
  }
  window.searchBar = searchBar;
});
