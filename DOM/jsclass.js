class Model {
    tweets = [];

    constructor(posts) {
        this.tweets = posts;
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

        resultPosts.sort(Model.comparator);
        return resultPosts.slice(skip, skip + top);
    }
    

    clear() {
        this.tweets = [];
        return null;
    }

    addAll(posts) {
        let invalid = [];
        posts.forEach(post => {
            if (!Model.validatePost(post))
                invalid.push(post);
        });
        return invalid;
    }

    getPost(id) {
        return this.tweets.find(post => post.id === id) || false;
    }

    addPost(post) {
        
        if (Model.validatePost(post)) {
            this.tweets.push(post);
            return true;
        }
        return false;
    }

    deletePost(id) {
        if (this.tweets.findIndex(post => post.id === id) !== -1) {
            this.tweets.splice(this.tweets.findIndex(post => post.id === id), this.tweets.findIndex(post => post.id === id) + 1);
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
        if (Model.validatePost(editedPost)) {
            this.tweets.push(editedPost);
            return true;
        }
        return false;
    }

    static validatePost(post) {
        if (post) {
            if (!post.description)
                return false;

            if (post.description) {
                if (post.description.length > 200 || typeof post.description !== "string")
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

class View {

    username;
    tweetTemplate;
    tweetContainer;

    constructor() {
        this.tweetTemplate = document.getElementById('tweetTemplate');
        this.tweetContainer = document.getElementById('tweetContainer');
        this.username = 'meister_alex35';
    }

    add(data) {
        let newNote = document.importNode(this.tweetTemplate.content, true);
        let placeholders = newNote.querySelectorAll('[my_data]');
        [].forEach.call(placeholders || [], (phElement) => {
            let key = phElement.getAttribute('my_data');
            if (key === 'createdAt') {
                phElement.textContent = String(data[key].toLocaleString())
            } else {
                if (key === 'hashTags') {
                    phElement.textContent = String(data.hashTags.map(item => '#' + item).join(''));
                } else
                    phElement.textContent = String(data[key]);
            }
		
			if (key === 'author' && String(data[key]) !== this.username) {
				newNote.firstElementChild.querySelector('[class="like_icon"]').style.visibility="visible"
				newNote.firstElementChild.querySelector('[class="edit_icon"]').style.visibility="hidden"
				newNote.firstElementChild.querySelector('[class="delete_icon"]').style.visibility="hidden"
				//newNote.getElementsByClassName('like_icon')[0].setAttribute('style', 'display: inline')
			}

        });
        newNote.firstElementChild.setAttribute('id', data.id)
        this.tweetContainer.insertBefore(newNote, this.tweetContainer.firstElementChild);
    }

    addAll(posts = []) {
        posts.forEach((post) => this.add(post))
    }
 
    remove(id = '') {
        document.getElementById(id).remove();
    }

    edit(id = '', data = {}) {
        let newNote = document.importNode(this.tweetTemplate.content, true);
        let placeholders = newNote.querySelectorAll('[my_data]');

        [].forEach.call(placeholders || [], (phElement) => {
            let key = phElement.getAttribute('my_data');
            if (key === 'createdAt') {
                phElement.textContent = String(data[key].toLocaleString())
            } else {
                if (key === 'hashTags') {
                    phElement.textContent = String(data.hashTags.map(item => '#' + item).join(''));
                } else
                    phElement.textContent = String(data[key]);
            }
         
			if (key === 'author' && String(data[key]) !== this.username) {
				newNote.firstElementChild.querySelector('[class="like_icon"]').style.visibility="visible"
            newNote.firstElementChild.querySelector('[class="edit_icon"]').style.visibility="hidden"
            newNote.firstElementChild.querySelector('[class="delete_icon"]').style.visibility="hidden"
			}
        });
        newNote.firstElementChild.setAttribute('id', data.id)
        document.getElementById(id).replaceWith(newNote);
    }
	clearView() {
        let first = this.tweetContainer.firstElementChild;

        while (first !== this.tweetContainer.lastElementChild) {
            first.remove();

            first = this.tweetContainer.firstElementChild;
        }
    }
	
}

let view;
let model;
window.onload = () => {
    view = new View();
    model = new Model(posts);
	addPosts(posts)
	
 /*addPost({
        id: '2',
        description: 'js4life',
		author: 'meister_alex35',
        createdAt: new Date('2020-04-17T23:06:00'),
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
        hashTags: [
            'javascript', 'liketime'
        ],
	})*/
	
	/*editPost('2',{
        id: '2',
        description: 'hey',
        photoLink: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png',
        hashTags: [
            'javascript', 'liketime'
        ],
	})*/
	//deletePost('2')
	//clear()
   
};
let posts = [
    {
        id: '1',
        description: 'Более 76 тыс. человек во всем мире уже излечились от заболевания, спровоцированного новым коронавирусом, тогда как количество смертей превысило 6,4 тыс.',
        createdAt: new Date('2020-04-18T23:00:00'),
        author: 'guest',
        photoLink: 'https://www.pressball.by/images/stories/2020/03/20200..',
        hashTags: ['coronavirus', 'коронавирус'],
    }
];

function addPost(post) {
    if (model.addPost(post))
        view.add(post)
}

function addPosts(posts) {
    if (model.addAll(posts))
        view.addAll(posts)
}

function deletePost(id) {
    if (view.remove(id)) {
        model.deletePost(id)
        return true;
    }
    return false;
}

function editPost(id, post) {
    if (model.editPost(id, post)) {
        view.edit(id, model.getPost(id))
    }
}
 function clear()
 {
	 view.clearView()
 }
