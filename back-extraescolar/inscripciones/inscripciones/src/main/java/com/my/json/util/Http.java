/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.my.json.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;
/**
 *
 * @author DELL
 */

public final class Http {
    public static final ObjectMapper MAPPER = new ObjectMapper();

    private Http() {}

    public static void enviar(HttpServletResponse resp, int status, Object cuerpo) throws IOException {
        resp.setStatus(status);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        MAPPER.writeValue(resp.getWriter(), cuerpo);
    }

    public static void mensaje(HttpServletResponse resp, String texto) throws IOException {
        enviar(resp, 200, Map.of("mensaje", texto));
    }

    public static void error(HttpServletResponse resp, int status, String texto) throws IOException {
        enviar(resp, status, Map.of("error", texto));
    }

    public static void errorSql(HttpServlet servlet, HttpServletResponse resp, SQLException e)
            throws IOException {
        servlet.log("Error SQL", e);
        String estado = e.getSQLState() == null ? "" : e.getSQLState();
        if (estado.equals("23505")) error(resp, 409, "Registro duplicado");
        else if (estado.equals("23503")) error(resp, 409, "Referencia inexistente o registro en uso");
        else if (estado.equals("23502") || estado.startsWith("22")) error(resp, 400, "Datos inválidos o incompletos");
        else error(resp, 500, "Error en la base de datos");
    }

    /** Devuelve los segmentos después de la ruta base: /api/x/5/7 -> ["5","7"] */
    public static String[] ids(HttpServletRequest req) {
        String p = req.getPathInfo();
        if (p == null || p.equals("/")) return new String[0];
        return p.substring(1).split("/");
    }
}
