apiURL = "https://dev-css-vn.pantheonsite.io/api/blogs"

// Make a new component
//credit to @Bill Criswell for this filter
Vue.filter('truncate', function (text, stop, clamp) {
    return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
})

var App = Vue.extend({});

var blogList = Vue.extend({
  template: '#blog-list-template',

  data: function() {
    return {
      blogs: '',
      liveFilter: '',
      genreFilter: '',
      genres: '',
      blog: '',
      tagFilter: ''
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
        if (this.$route.params.tagID) {
          this.$set('tagFilter', '/topic/' + this.$route.params.tagID);
        }

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
        this.$set('blogID', this.$route.params.blogID);
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
  },
  '/tag/:tagID': {
    name: 'tag',
    component: blogList
  }
});

router.start(App, '#app');
