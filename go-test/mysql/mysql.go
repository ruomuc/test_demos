package main

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", "root:rootroot@tcp(127.0.0.1:3306)/test")
	if err != nil {
		log.Fatal(err)
	}

	var name string
	var id int
	var num int
	rows, err := db.Query("SELECT * FROM test_dup WHERE id = ?", 138)
	if err != nil {
		log.Fatal(err)
	}
	for rows.Next() {
		if err := rows.Scan(&id, &num, &name); err != nil {
			log.Fatal(err)
		}
		fmt.Printf("id is %d,num is %d ,name is %s \n", id, num, name)
	}
	if err := rows.Err(); err != nil {
		log.Fatal(err)
	}

	row := db.QueryRow("SELECT * FROM test_dup WHERE id = ?", 139)
	if err := row.Scan(&id, &num, &name); err != nil {
		log.Fatal(err)
	}
	fmt.Printf("queryrow, id is %d,num is %d ,name is %s \n", id, num, name)

}
