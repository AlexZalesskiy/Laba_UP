class PostList{
	tweets=[];
constructor(posts){
	this.tweets=posts.filter(post => PostList.validatePost(post));
}
 clear() {
        this.tweets = [];
		return null;
    }
	addAll(posts){
		let invalid=[];
		posts.forEach(post=> {
			if(!PostList.validatePost(post)) 
			invalid.push(post);
		});
		return invalid;
	}
  getPost(id) {
        return this.tweets.find(post => post.id === id) || false;
    }
	
  addPost(post){
        if (PostList.validatePost(post)){
            this.tweets.push(post);
            return true;
        }
        return false;
    }
	
 deletePost(id) {
        if (this.tweets.findIndex(post=>post.id === id) !== -1) {
            this.tweets.splice(this.tweets.findIndex(post=>post.id === id), this.tweets.findIndex(post=>post.id === id)+1);
            return true;
        }
        return false;
    }
	
  static comparator(a, b) {
        return b.createdAt - a.createdAt;
    }
	
 editPost(id, post) {
        let editedPost = this.getPost(id);
        if (post.description) {
            editedPost.description = post.description;
        }
        if (post.photoLink) {
            editedPost.photoLink = post.photoLink;
        }
        if (post.hashtags) {
            editedPost.hashtags = post.hashtags;
        }
        if (PostList.validatePost(editedPost)) {
            this.tweets.push(editedPost);
            return true;
        }
        return false;
    }
	
  getPosts(skip = 0, top = 0, filterConfig = undefined) {
        let resultPosts = this.tweets;
        if (filterConfig) {

            if (filterConfig.author) {
                resultPosts = resultPosts.filter(function (post) {
                    if (post.author.includes(filterConfig.author))
                        return post.author;
                });
            }

            if (filterConfig.from) {
                resultPosts = resultPosts.filter(function (post) {
                    return post.createdAt >= filterConfig.from;
                });
            }

            if (filterConfig.to) {
                resultPosts = resultPosts.filter(function (post) {
                    return post.createdAt <= filterConfig.to;
                });
            }

            if (filterConfig.hashtags) {
                resultPosts = resultPosts.filter(function (post) {
                    if (filterConfig.hashtags.every(hashtag => post.hashtags.includes(hashtag)))
                        return post.hashtags;
                });
            }

        }

        resultPosts.sort(PostList.comparator);
        return resultPosts.slice(skip, skip + top);
    }
  static validatePost(post) {
        if (post) {
			 if (!post.description)
                return false;

            if (post.description) {
                 if ( post.description.length > 200 ||  typeof post.description !== "string")
                    return false;
            }

            if (post.photoLink) {
                if (typeof post.photoLink !== 'string')
                    return false;
            }

            if (post.hashtags) {
                if (post.hashtags.some(hashtag => typeof hashtag !== 'string'))
                    return false;
            }
			
        }

        return true;
    }
}
let posts = new PostList([

    {
        id: '1',
        description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
        createdAt: new Date('2020-03-17T23:01:00'),
        author: 'Иванов Иван',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'coronavirus', 'virus'
        ],
        likes: [
            'Иванов Иван'
        ]
    },
    {
        id: '2',
        description: 'js4life',
        createdAt: new Date('2020-04-17T23:06:00'),
        author: 'Alex',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
        hashTags: [
            'javascript', 'liketime'
        ],
        likes: [
            'Алексей Залесский'
        ]
    },
    {
        id: '3',
        description: 'nba time',
        createdAt: new Date('2020-03-18T23:07:00'),
        author: 'Kobe',
        photoLink: 'https://www.slamdunk.ru/forum/uploads/monthly_2020_01/c8c5b000e0d731bd1b10708e5ec88353.jpg.1b8b74abdd8a629229817a80991e0898.jpg',
        hashTags: [
            'nba', 'legend'
        ],
        likes: [
            'Alexeyka'
        ]
    },
    {
        id: '4',
        description: 'Real Madrid best club',
        createdAt: new Date('2020-06-17T23:00:00'),
        author: 'Perez',
        photoLink: 'https://statistics-stat-logos.trbna.com/champions_league/2018-19/real_madrid.png?height=28&width=28',
        hashTags: [
            'football'
        ],
        likes: []
    },
    {
        id: '5',
        description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
        createdAt: new Date('2020-08-17T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'coronavirus', 'virus'
        ],
        likes: [
            'Иванов Иван'
        ]
    },
    {
        id: '6',
        description: 'js4life',
        createdAt: new Date('2020-01-17T23:05:00'),
        author: 'Alex',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
        hashTags: [
            'javascript', 'liketime'
        ],
        likes: [
            'Алексей Залесский'
        ]
    },
    {
        id: '7',
        description: 'nba time',
        createdAt: new Date('2020-03-18T23:00:06'),
        author: 'Kobe',
        photoLink: 'https://www.slamdunk.ru/forum/uploads/monthly_2020_01/c8c5b000e0d731bd1b10708e5ec88353.jpg.1b8b74abdd8a629229817a80991e0898.jpg',
        hashTags: [
            'nba', 'legend'
        ],
        likes: [
            'Alexeyka'
        ]
    },
    {
        id: '8',
        description: 'Real Madrid best club',
        createdAt: new Date('2020-04-17T23:22:00'),
        author: 'Perez',
        photoLink: 'https://statistics-stat-logos.trbna.com/champions_league/2018-19/real_madrid.png?height=28&width=28',
        hashTags: [
            'football'
        ],
        likes: []
    },
    {
        id: '9',
        description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
        createdAt: new Date('2019-03-17T23:00:00'),
        author: 'Иванов Иван',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'coronavirus', 'virus'
        ],
        likes: [
            'Иванов Иван'
        ]
    },
    {
        id: '10',
        description: 'js4life',
        createdAt: new Date('2020-05-17T23:06:00'),
        author: 'Alex',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
        hashTags: [
            'javascript', 'liketime'
        ],
        likes: [
            'Алексей Залесский'
        ]
    },
    {
        id: '11',
        description: 'nba time',
        createdAt: new Date('2020-03-18T23:00:20'),
        author: 'Kobe',
        photoLink: 'https://www.slamdunk.ru/forum/uploads/monthly_2020_01/c8c5b000e0d731bd1b10708e5ec88353.jpg.1b8b74abdd8a629229817a80991e0898.jpg',
        hashTags: [
            'nba', 'legend'
        ],
        likes: [
            'Alexeyka'
        ]
    },
    {
        id: '12',
        description: 'Real Madrid best club',
        createdAt: new Date('2020-04-17T23:00:50'),
        author: 'Perez',
        photoLink: 'https://statistics-stat-logos.trbna.com/champions_league/2018-19/real_madrid.png?height=28&width=28',
        hashTags: [
            'football'
        ],
        likes: []
    },
    {
        id: '13',
        description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
        createdAt: new Date('2020-09-17T23:00:30'),
        author: 'Иванов Иван',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'coronavirus', 'virus'
        ],
        likes: [
            'Иванов Иван'
        ]
    },
    {
        id: '14',
        description: 'js4life',
        createdAt: new Date('2020-03-17T23:00:00'),
        author: 'Alex',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
        hashTags: [
            'javascript', 'liketime'
        ],
        likes: [
            'Алексей Залесский'
        ]
    },
    {
        id: '15',
        description: 'nba time',
        createdAt: new Date('2020-06-18T23:00:00'),
        author: 'Kobe',
        photoLink: 'https://www.slamdunk.ru/forum/uploads/monthly_2020_01/c8c5b000e0d731bd1b10708e5ec88353.jpg.1b8b74abdd8a629229817a80991e0898.jpg',
        hashTags: [
            'nba', 'legend'
        ],
        likes: [
            'Alexeyka'
        ]
    },
    {
        id: '16',
        description: 'Real Madrid best club',
        createdAt: new Date('2020-04-17T23:20:00'),
        author: 'Perez',
        photoLink: 'https://statistics-stat-logos.trbna.com/champions_league/2018-19/real_madrid.png?height=28&width=28',
        hashTags: [
            'football'
        ],
        likes: []
    },
    {
        id: '17',
        description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
        createdAt: new Date('2020-07-17T23:02:00'),
        author: 'Иванов Иван',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200310231542.jpg',
        hashTags: [
            'coronavirus', 'virus'
        ],
        likes: [
            'Иванов Иван'
        ]
    },
    {
        id: '18',
        description: 'js4life',
        createdAt: new Date('2020-04-17T23:45:00'),
        author: 'Alex',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
        hashTags: [
            'javascript', 'liketime'
        ],
        likes: [
            'Алексей Залесский'
        ]
    },
    {
        id: '19',
        description: 'nba time',
        createdAt: new Date('2020-03-18T23:34:00'),
        author: 'Kobe',
        photoLink: 'https://www.slamdunk.ru/forum/uploads/monthly_2020_01/c8c5b000e0d731bd1b10708e5ec88353.jpg.1b8b74abdd8a629229817a80991e0898.jpg',
        hashTags: [
            'nba', 'legend'
        ],
        likes: [
            'Alexeyka'
        ]
    },
    {
        id: '20',
        description: 'Real Madrid best club',
        createdAt: new Date('2020-04-17T22:00:00'),
        author: 'Perez',
        photoLink: 'https://statistics-stat-logos.trbna.com/champions_league/2018-19/real_madrid.png?height=28&width=28',
        hashTags: [
            'football'
        ],
        likes: []
    },

]);

console.log("first 3 posts");
console.log(posts.getPosts(0,3));
console.log("first 3 posts after 3rd post");
console.log(posts.getPosts(3,3));
console.log("Posts by Alex");
console.log(posts.getPosts(0,2,{author: 'Alex'}));
console.log("Get post by ID");
console.log(posts.getPost('5'));
console.log("Get not existing post");
console.log(posts.getPost('24'));
console.log("Check validating");
console.log(PostList.validatePost({id: '124', createdAt: new Date(),  description: 'Hello', author:'Its me', hashTags: ['i was wondering'],likes: ["ME"]}));
console.log("Check validating without param");
console.log(PostList.validatePost({ createdAt: new Date(),author:'Its me', hashTags: ['i was wondering']}));
console.log("Add Post");
console.log(posts.addPost({id: '21', createdAt: new Date(),  description: 'New Post', author:'Stephen King', hashTags: ['post']}));
console.log(posts.getPost('21'));
console.log("Edit post and get");
posts.editPost( '21',{description: "edit", hashTags: ['edit this']});
console.log(posts.getPost('21'));
console.log("Delete post");
posts.deletePost('21');
console.log(posts.getPost('21'));
let invalid = posts.addAll([
    {
        createdAt: new Date(),
        hashTags: ['test drive'],
        likes: ['leha']
    }
	
		]);
console.log("Add All");
console.log(invalid);
posts.clear();