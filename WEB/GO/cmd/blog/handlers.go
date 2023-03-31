package main

import (
	"html/template"
	"log"
	"net/http"
)

type indexPage struct {
	Title           string
	FeaturedPosts   []featuredPostData
	MostRecentPosts []mostRecentPostData
}

type featuredPostData struct {
	Span        string
	SpanClass   string
	Title       string
	Subtitle    string
	ImgModifier string
	Author      string
	AuthorImg   string
	PublishDate string
}

type mostRecentPostData struct {
	Img         string
	Title       string
	Subtitle    string
	ImgDir      string
	Author      string
	AuthorImg   string
	PublishDate string
}

func index(w http.ResponseWriter, r *http.Request) {
	ts, err := template.ParseFiles("pages/index.html") // Главная страница блога
	if err != nil {
		http.Error(w, "Internal Server Error", 500) // В случае ошибки парсинга - возвращаем 500
		log.Println(err.Error())                    // Используем стандартный логгер для вывода ошбики в консоль
		return                                      // Не забываем завершить выполнение ф-ии
	}

	data := indexPage{
		Title:           "Travel blog",
		FeaturedPosts:   featuredPosts(),
		MostRecentPosts: mostRecentPosts(),
	}

	err = ts.Execute(w, data) // Заставляем шаблонизатор вывести шаблон в тело ответа
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err.Error())
		return
	}
}

func featuredPosts() []featuredPostData {
	return []featuredPostData{
		{
			Span:        "ADVENTURE",
			SpanClass:   "featured-post__splash",
			Title:       "The Road Ahead",
			Subtitle:    "The road ahead might be paved - it might not be.",
			ImgModifier: "featured-post__background_the-road-ahead",
			Author:      "Mat Vogels",
			AuthorImg:   "static/img/Mat-Vogels.png",
			PublishDate: "September 25, 2015",
		},
		{
			Span:        "",
			SpanClass:   "",
			Title:       "From Top Down",
			Subtitle:    "Once a year, go someplace you’ve never been before.",
			ImgModifier: "featured-post__background_from-top-to-down",
			Author:      "William Wong",
			AuthorImg:   "static/img/William-Wong.png",
			PublishDate: "September 25, 2015",
		},
	}
}

func mostRecentPosts() []mostRecentPostData {
	return []mostRecentPostData{
		{
			Img:         "air_baloons.png",
			Title:       "Still Standing Tall",
			Subtitle:    "Life begins at the end of your comfort zone.",
			ImgDir:      "static/img/air-baloons.png",
			Author:      "William-Wong",
			AuthorImg:   "static/img/William-Wong.png",
			PublishDate: "9/25/2015",
		},
		{
			Img:         "bridge.png",
			Title:       "Sunny Side Up",
			Subtitle:    "No place is ever as bad as they tell you it’s going to be.",
			ImgDir:      "static/img/bridge.png",
			Author:      "Mat-Vogels",
			AuthorImg:   "static/img/Mat-Vogels.png",
			PublishDate: "9/25/2015",
		},
		{
			Img:         "sunset.png",
			Title:       "Water Falls",
			Subtitle:    "We travel not to escape life, but for life not to escape us.",
			ImgDir:      "static/img/sunset.png",
			Author:      "Mat-Vogels",
			AuthorImg:   "static/img/Mat-Vogels.png",
			PublishDate: "9/25/2015",
		},
		{
			Img:         "tide.png",
			Title:       "Through the Mist",
			Subtitle:    "Travel makes you see what a tiny place you occupy in the world.",
			ImgDir:      "static/img/tide.png",
			Author:      "William-Wong",
			AuthorImg:   "static/img/William-Wong.png",
			PublishDate: "9/25/2015",
		},
		{
			Img:         "mist.png",
			Title:       "Awaken Early",
			Subtitle:    "Not all those who wander are lost.",
			ImgDir:      "static/img/mist.png",
			Author:      "Mat-Vogels",
			AuthorImg:   "static/img/Mat-Vogels.png",
			PublishDate: "9/25/2015",
		},
		{
			Img:         "waterfall.png",
			Title:       "Try it Always",
			Subtitle:    "The world is a book, and those who do not travel read only one page.",
			ImgDir:      "static/img/waterfall.png",
			Author:      "Mat-Vogels",
			AuthorImg:   "static/img/Mat-Vogels.png",
			PublishDate: "9/25/2015",
		},
	}
}
