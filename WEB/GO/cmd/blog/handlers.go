package main

import (
	"html/template"
	"log"
	"net/http"
)

type indexPage struct {
	Title         string
	FeaturedPosts []featuredPostData
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

func index(w http.ResponseWriter, r *http.Request) {
	ts, err := template.ParseFiles("pages/index.html") // Главная страница блога
	if err != nil {
		http.Error(w, "Internal Server Error", 500) // В случае ошибки парсинга - возвращаем 500
		log.Println(err.Error())                    // Используем стандартный логгер для вывода ошбики в консоль
		return                                      // Не забываем завершить выполнение ф-ии
	}

	data := indexPage{
		Title:         "Travel blog",
		FeaturedPosts: featuredPosts(),
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
