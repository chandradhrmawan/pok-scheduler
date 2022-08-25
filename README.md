
## Mengunduh Repository

Unduh repository ke dalam komputer menggunakan perintah `git clone`. Url
repository dapat dilihat di dalam repository yang diinginkan.

```
git clone https://github.com/chandradhrmawan/joybox-test.git
```

lalu pindah ke branch `master`

```
git checkout master
```

## Set env

rename `.env.example` menjadi `.env`
```
.joybox-test
├── .env.example
 
```

## Install dependencies dan menjalankan aplikasi
  Install dependencies :

```bash
$ npm install
```
  Run unit test:

```bash
$ npm run test
```

  Start the server:

```bash
$ npm run dev
```

## Penggunaan Rest Api

The REST API to the app is described below.

## Get list all books

### Request

`GET /api/books/get`

    curl --location --request GET 'http://localhost:3500/api/books/get'

### Response

    HTTP/1.1 200 OK
    Date: Tue, 28 Jul 2022 19:10:35 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json
    Content-Length: 194

    {"status":true,"message":"Success","data":[{"cover_id":12818862,"title":"Wuthering Heights","author":[{"key":"/authors/OL4327048A","name":"Emily Brontë"}],"edition_count":1434,"cover_edition_key":1434},{"cover_id":8257991,"title":"Romeo and Juliet","author":[{"key":"/authors/OL9388A","name":"William Shakespeare"}],"edition_count":968,"cover_edition_key":968},{"cover_id":8303480,"title":"Ethan Frome","author":[{"key":"/authors/OL20188A","name":"Edith Wharton"}],"edition_count":718,"cover_edition_key":718},{"cover_id":1260453,"title":"Importance of Being Earnest","author":[{"key":"/authors/OL20646A","name":"Oscar Wilde"}],"edition_count":441,"cover_edition_key":441},{"cover_id":2560652,"title":"Anna Karénina","author":[{"key":"/authors/OL26783A","name":"Lev Nikolaevič Tolstoy"}],"edition_count":387,"cover_edition_key":387},{"cover_id":8235511,"title":"The Republic","author":[{"key":"/authors/OL189658A","name":"Πλάτων"},{"key":"/authors/OL2933723A","name":"G.M.A. Grube"}],"edition_count":349,"cover_edition_key":349},{"cover_id":8236320,"title":"Cyrano de Bergerac","author":[{"key":"/authors/OL39281A","name":"Edmond Rostand"}],"edition_count":306,"cover_edition_key":306},{"cover_id":10708272,"title":"Le Petit Prince","author":[{"key":"/authors/OL31901A","name":"Antoine de Saint-Exupéry"}],"edition_count":267,"cover_edition_key":267},{"cover_id":8236248,"title":"The Dialogues of Plato","author":[{"key":"/authors/OL189658A","name":"Πλάτων"}],"edition_count":246,"cover_edition_key":246},{"cover_id":8779054,"title":"Works [37 plays, 6 poems, sonnets]","author":[{"key":"/authors/OL9388A","name":"William Shakespeare"}],"edition_count":213,"cover_edition_key":213},{"cover_id":8236957,"title":"Symposium","author":[{"key":"/authors/OL189658A","name":"Πλάτων"}],"edition_count":150,"cover_edition_key":150},{"cover_id":8236950,"title":"Vita nuova","author":[{"key":"/authors/OL9356937A","name":"Dante Alighieri"}],"edition_count":148,"cover_edition_key":148}]}

## Search list book by genre 

### Request

`GET /api/books/get?genre=Suicide`

    curl --location --request GET 'http://localhost:3500/api/books/get?genre=Suicide'

### Response

    HTTP/1.1 200 OK
    Date: Tue, 28 Jul 2022 19:10:35 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json
    Content-Length: 194

    {"status":true,"message":"Success","data":[{"cover_id":8257991,"title":"Romeo and Juliet","author":[{"key":"/authors/OL9388A","name":"William Shakespeare"}],"edition_count":968,"cover_edition_key":968},{"cover_id":8779054,"title":"Works [37 plays, 6 poems, sonnets]","author":[{"key":"/authors/OL9388A","name":"William Shakespeare"}],"edition_count":213,"cover_edition_key":213}]}
    
## Search list book by multiple genre

### Request

`GET /api/books/multi/get?genre=["Unterrichtseinheit","Classic fiction"]`

    curl --location -g --request GET 'http://localhost:3500/api/books/multi/get?genre=["Unterrichtseinheit","Classic fiction"]'

### Response

    HTTP/1.1 200 OK
    Date: Tue, 28 Jul 2022 19:10:35 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json
    Content-Length: 194

    {"status":true,"message":"Success","data":[{"cover_id":8257991,"title":"Romeo and Juliet","author":[{"key":"/authors/OL9388A","name":"William Shakespeare"}],"edition_count":968,"cover_edition_key":968},{"cover_id":8779054,"title":"Works [37 plays, 6 poems, sonnets]","author":[{"key":"/authors/OL9388A","name":"William Shakespeare"}],"edition_count":213,"cover_edition_key":213}]}

## save booking book

### Request

`GET /api/booking/save`

    curl --location --request POST 'http://localhost:3500/api/booking/save' \
         --header 'Content-Type: application/json' \
         --data-raw '{
            "cover_id": 8257991,
            "start_booking":"2022-07-28 10:33:30",
            "end_booking":"2022-08-29 10:33:30"
         }'

### Response

    HTTP/1.1 200 OK
    Date: Tue, 28 Jul 2022 19:10:35 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json
    Content-Length: 194

    {"status":true,"message":"Success","data":[{"cover_id":8257991,"start_booking":"2022-07-28 10:33:30","end_booking":"2022-08-29 10:33:30","booking_id":1},{"cover_id":8257991,"start_booking":"2022-07-28 10:33:30","end_booking":"2022-08-29 10:33:30","booking_id":2}]}
    
## get data booking book

### Request

`GET /api/booking/get`

    curl --location --request GET 'http://localhost:3500/api/booking/get'

### Response

    HTTP/1.1 200 OK
    Date: Tue, 28 Jul 2022 19:10:35 GMT
    Status: 200 OK
    Connection: keep-alive
    Content-Type: application/json
    Content-Length: 194

    {"status":true,"message":"Success","data":[{"cover_id":8257991,"start_booking":"2022-07-28 10:33:30","end_booking":"2022-08-29 10:33:30","booking_id":1},{"cover_id":8257991,"start_booking":"2022-07-28 10:33:30","end_booking":"2022-08-29 10:33:30","booking_id":2}]}

## link postman api collection
https://documenter.getpostman.com/view/3902573/UzXNVxrk
