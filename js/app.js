apiURL = "https://dev-css-vn.pantheonsite.io/api/movies"

// Make a new component

var App = Vue.extend({});

var blogList = Vue.extend({
  template: '#blog-list-template',

  data: function() {
    return {
      blogs: '',
      liveFilter: '',
      genreFilter: '',
      genres: '',
      blog: ''
    }
  },

  ready: function() {
    this.getblogs()
  },

  methods: {
    getblogs: function() {
      this.$set('blog', '');
      this.$http.get(apiURL, function(blogs) {
        this.$set('blogs', blogs);

        // Automatic get the genres from drupal Site
        genresArr=[];
        jQuery.each(blogs, function(index, blog) {
          jQuery.each(blog.field_genres, function(index, genre) {
            if(jQuery.inArray(genre.value.toLowerCase(), genresArr) === -1){
              genresArr.push(genre.value.toLowerCase());
            };
          });
        });
        this.$set('genres',genresArr);
      });
    },
  }
});

var singleblog = Vue.extend({
  template: '#single-blog-template',

  data: function() {
    return {
      blog: ''
    }
  },

  ready: function() {
    this.getTheblog();
  },

  methods: {
    getTheblog: function() {
      this.$http.get(apiURL + '/' + this.$route.params.blogID , function(blog) {
        this.$set('blog', blog);
        console.log(JSON.stringify(blog));
      })
    }
  }
})

var router = new VueRouter();

router.map({
  '/': {
    component: blogList
  },
  '/blog/:blogID': {
    name: 'blog',
    component: singleblog
  }
});

router.start(App, '#app');
