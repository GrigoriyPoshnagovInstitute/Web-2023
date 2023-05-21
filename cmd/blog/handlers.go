package main

import (
	"database/sql"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"

	"encoding/base64"
	"encoding/json"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

type indexPage struct {
	Title           string
	FeaturedPosts   []featuredPostData
	MostRecentPosts []mostRecentPostData
}

type featuredPostData struct {
	PostID      string `db:"post_id"`
	Title       string `db:"title"`
	Subtitle    string `db:"subtitle"`
	ImgModifier string `db:"image_modifier"`
	Author      string `db:"author"`
	AuthorImg   string `db:"author_url"`
	PublishDate string `db:"publish_date"`
}

type mostRecentPostData struct {
	PostID      string `db:"post_id"`
	Title       string `db:"title"`
	Subtitle    string `db:"subtitle"`
	ImgModifier string `db:"image_url"`
	Author      string `db:"author"`
	AuthorImg   string `db:"author_url"`
	PublishDate string `db:"publish_date"`
}

type parsedPostData struct {
	Title       string `json:"title"`
	Subtitle    string `json:"description"`
	PublishDate string `json:"date"`
	AuthorImg   string `json:"avatar"`
	AvatarURL   string `json:"avatarURL"`
	Author      string `json:"name"`
	HeroImg     string `json:"heroImage"`
	HeroURL     string `json:"heroURL"`
	Content     string `json:"content"`
}

type postData struct {
	Title       string `db:"title"`
	Subtitle    string `db:"subtitle"`
	ImgModifier string `db:"image_url"`
	Content     string `db:"content"`
}

func index(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		upperPosts, err := featuredPosts(db)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		posts, err := mostRecentPosts(db)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		ts, err := template.ParseFiles("pages/index.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		data := indexPage{
			Title:           "Escape",
			FeaturedPosts:   upperPosts,
			MostRecentPosts: posts,
		}

		err = ts.Execute(w, data)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		log.Println("Request completed successfully")
	}
}

func post(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		postIDStr := mux.Vars(r)["postID"]

		postID, err := strconv.Atoi(postIDStr)
		if err != nil {
			http.Error(w, "Invalid order id", 403)
			log.Println(err)
			return
		}

		post, err := postByID(db, postID)
		if err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "post not found", 404)
				log.Println(err)
				return
			}
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		ts, err := template.ParseFiles("pages/post.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		err = ts.Execute(w, post)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		log.Println("Request completed successfully")
	}
}

func admin(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {

		ts, err := template.ParseFiles("pages/admin.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		err = ts.Execute(w, post)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		log.Println("Request completed successfully")
	}
}

func login(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {

		ts, err := template.ParseFiles("pages/login.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		err = ts.Execute(w, post)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err)
			return
		}

		log.Println("Request completed successfully")
	}
}

func sendPost(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		var data parsedPostData
		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		var lastID int64
		err = db.Get(&lastID, "SELECT MAX(post_id) FROM post")
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		newID := lastID + 1

		avatarSavePath := "C:/WEB/static/img/" + data.AvatarURL

		fmt.Println(avatarSavePath)

		avatarImage, err := base64.StdEncoding.DecodeString(data.AuthorImg)
		if err != nil {
			fmt.Println("Ошибка декодирования изображения:", err)
			return
		}

		file, err := os.Create(avatarSavePath)
		if err != nil {
			fmt.Println("Ошибка создания файла:", err)
			return
		}
		defer file.Close()

		_, err = file.Write(avatarImage)
		if err != nil {
			fmt.Println("Ошибка сохранения изображения:", err)
			return
		}

		fmt.Println("Изображение успешно сохранено.")

		heroSavePath := "C:/WEB/static/img/" + data.HeroURL

		heroImage, err := base64.StdEncoding.DecodeString(data.HeroImg)
		if err != nil {
			fmt.Println("Ошибка декодирования изображения:", err)
			return
		}

		file, err = os.Create(heroSavePath)
		if err != nil {
			fmt.Println("Ошибка создания файла:", err)
			return
		}
		defer file.Close()

		_, err = file.Write(heroImage)
		if err != nil {
			fmt.Println("Ошибка сохранения изображения:", err)
			return
		}

		fmt.Println("Изображение успешно сохранено.")

		const query = `
		INSERT INTO 
			post (
				post_id,
				title,
				subtitle,
				content,
				image_url,
				image_modifier,
				publish_date, 
				author_url, 
				author, 
				featured
			)
		VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
		`

		_, err = db.Exec(query, newID, data.Title, data.Subtitle, data.Content, "/static/img/"+data.HeroURL, "", data.PublishDate, "static/img/"+data.AvatarURL, data.Author, 0)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		var upperPosts []featuredPostData

		db.Select(&upperPosts, query)

		log.Println("Request completed successfully")

	}
}

func featuredPosts(db *sqlx.DB) ([]featuredPostData, error) {
	const query = `
		SELECT
			post_id,
			title,
			subtitle,
			image_modifier,
			publish_date,
			author_url,
			author
		FROM
			post
		WHERE featured = 1
	`
	var upperPosts []featuredPostData

	err := db.Select(&upperPosts, query)
	if err != nil {
		return nil, err
	}

	return upperPosts, nil
}

func mostRecentPosts(db *sqlx.DB) ([]mostRecentPostData, error) {
	const query = `
		SELECT
			post_id,
			title,
			subtitle,
			image_url,
			publish_date,
			author_url,
			author
		FROM
			post
		WHERE featured = 0	
	`
	var posts []mostRecentPostData

	err := db.Select(&posts, query)
	if err != nil {
		return nil, err
	}

	return posts, nil
}

func postByID(db *sqlx.DB, postID int) (postData, error) {
	const query = `
		SELECT
			title,
			subtitle,
			image_url,
			content
		FROM
			post
		WHERE
			post_id = ?
	`
	var post postData

	err := db.Get(&post, query, postID)
	if err != nil {
		return postData{}, err
	}

	return post, nil
}
