/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.my.json.db;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
/**
 *
 * @author DELL
 */
public class ConexionDB {
    
    // stringtype=unspecified permite enviar fechas, horas y claves como texto
    // y que PostgreSQL las convierta al tipo de la columna.
    private static final String URL =
            "jdbc:postgresql://localhost:5432/inscripciones?stringtype=unspecified";
    private static final String USER = "postgres";
    private static final String PASSWORD = "Oqpwwpqo7";

    public static Connection getConexion() throws SQLException {
        try {
            Class.forName("org.postgresql.Driver");
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (ClassNotFoundException e) {
            throw new SQLException("No se encontró el driver de PostgreSQL en el proyecto", e);
        }
    }
}
