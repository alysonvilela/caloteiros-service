CREATE TABLE IF NOT EXISTS service_owners (
  id varchar(45) NOT NULL,
  user_name varchar(45) NOT NULL,
  phone varchar(45) NOT NULL,
  pix_key varchar(45) NOT NULL,
  created_at varchar(45) NOT NULL,
  updated_at varchar(45),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS charge (
  id varchar(45) NOT NULL,
  owner_id varchar(45) NOT NULL,
  svs_name varchar(45) NOT NULL,
  svs_value_in_cents INTEGER,
  demand_day varchar(45) NOT NULL,
  custom_message varchar(45),
  created_at varchar(45) NOT NULL,
  updated_at varchar(45),
  deleted_at varchar(45),
  PRIMARY KEY (id),
  CONSTRAINT fk_owner_id
    FOREIGN KEY (owner_id)
    REFERENCES service_owners(id)
);

CREATE TABLE IF NOT EXISTS team (
  id VARCHAR(45) PRIMARY KEY,
  charge_id VARCHAR(45) NOT NULL,
  created_at VARCHAR(45) NOT NULL,
  updated_at VARCHAR(45),
  FOREIGN KEY (charge_id) REFERENCES charge(id)
);

CREATE TABLE IF NOT EXISTS member (
  phone VARCHAR(45) NOT NULL,
  added_at VARCHAR(45) NOT NULL,
  deleted_at VARCHAR(45),
  team_id VARCHAR(45) NOT NULL,
  FOREIGN KEY (team_id) REFERENCES team(id)
);