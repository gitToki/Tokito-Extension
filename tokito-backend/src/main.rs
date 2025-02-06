use actix_web::{web, App, HttpServer, HttpResponse, Responder};
use actix_cors::Cors;
use jsonwebtoken::{encode, Header, EncodingKey, decode, DecodingKey, Validation, Algorithm};
use serde::{Serialize, Deserialize};
use std::time::{SystemTime, UNIX_EPOCH};

#[derive(Serialize, Deserialize)]
struct Claims {
    sub: String, 
    exp: usize, 
}

#[derive(Serialize, Deserialize)]
struct AuthRequest {
    username: String,
    password: String,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .wrap(Cors::default().allow_any_origin()) 
            .route("/api/auth", web::post().to(authenticate)) 
    })
    .bind("127.0.0.1:8080")?  // local port 8080
    .run()
    .await
}


async fn authenticate(auth: web::Json<AuthRequest>) -> impl Responder {

    if auth.username == "user" && auth.password == "password" {

        let claims = Claims {
            sub: auth.username.clone(),
            exp: (SystemTime::now().duration_since(UNIX_EPOCH).unwrap().as_secs() + 7200) as usize,  
        };

        let secret_key = "your_secret_key"; 
        let token = encode(&Header::new(Algorithm::HS256), &claims, &EncodingKey::from_secret(secret_key.as_ref()))
            .unwrap();


        HttpResponse::Ok().json(json!({ "token": token }))
    } else {
        HttpResponse::Unauthorized().json("Invalid credentials")
    }
}
