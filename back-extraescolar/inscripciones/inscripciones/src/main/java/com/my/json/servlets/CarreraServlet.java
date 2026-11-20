/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.my.json.servlets;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.my.json.dao.CarreraDAO;
import com.my.json.modelos.Carrera;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
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
@WebServlet(urlPatterns = {"/api/carreras", "/api/carreras/*"})
public class CarreraServlet extends HttpServlet {

    private final ObjectMapper mapper = new ObjectMapper();
    private final CarreraDAO dao = new CarreraDAO();

    // Soporte de PATCH (HttpServlet no trae doPatch)
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        if ("PATCH".equalsIgnoreCase(req.getMethod())) {
            doPatch(req, resp);
        } else {
            super.service(req, resp);
        }
    }

    // 1. GET: /api/carreras (lista) o /api/carreras/3 (uno)
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            Integer id = obtenerId(req);
            if (id == null) {
                enviar(resp, 200, dao.listar());
            } else {
                Carrera c = dao.buscarPorId(id);
                if (c == null) enviar(resp, 404, Map.of("error", "No encontrado"));
                else enviar(resp, 200, c);
            }
        } catch (NumberFormatException e) {
            enviar(resp, 400, Map.of("error", "Id inválido"));
        } catch (SQLException e) {
            errorSql(resp, e);
        }
    }

    // 2. POST: crea
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            Carrera nueva = mapper.readValue(req.getReader(), Carrera.class);
            enviar(resp, 201, dao.crear(nueva));
        } catch (JsonProcessingException e) {
            enviar(resp, 400, Map.of("error", "JSON de entrada inválido"));
        } catch (SQLException e) {
            errorSql(resp, e);
        }
    }

    // 3. PUT: reemplaza todo
    @Override
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            Integer id = obtenerId(req);
            if (id == null) {
                enviar(resp, 400, Map.of("error", "Falta el id en la URL"));
                return;
            }
            Carrera c = mapper.readValue(req.getReader(), Carrera.class);
            if (dao.actualizar(id, c)) enviar(resp, 200, Map.of("mensaje", "Actualizado por completo"));
            else enviar(resp, 404, Map.of("error", "No encontrado"));
        } catch (NumberFormatException e) {
            enviar(resp, 400, Map.of("error", "Id inválido"));
        } catch (JsonProcessingException e) {
            enviar(resp, 400, Map.of("error", "JSON de entrada inválido"));
        } catch (SQLException e) {
            errorSql(resp, e);
        }
    }

    // 4. PATCH: modifica solo los campos enviados
    protected void doPatch(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            Integer id = obtenerId(req);
            if (id == null) {
                enviar(resp, 400, Map.of("error", "Falta el id en la URL"));
                return;
            }
            Carrera c = mapper.readValue(req.getReader(), Carrera.class);
            if (dao.actualizarParcial(id, c)) enviar(resp, 200, Map.of("mensaje", "Actualizado parcialmente"));
            else enviar(resp, 404, Map.of("error", "No encontrado"));
        } catch (NumberFormatException e) {
            enviar(resp, 400, Map.of("error", "Id inválido"));
        } catch (JsonProcessingException e) {
            enviar(resp, 400, Map.of("error", "JSON de entrada inválido"));
        } catch (SQLException e) {
            errorSql(resp, e);
        }
    }

    // 5. DELETE: elimina
    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        try {
            Integer id = obtenerId(req);
            if (id == null) {
                enviar(resp, 400, Map.of("error", "Falta el id en la URL"));
                return;
            }
            if (dao.eliminar(id)) enviar(resp, 200, Map.of("mensaje", "Eliminado"));
            else enviar(resp, 404, Map.of("error", "No encontrado"));
        } catch (NumberFormatException e) {
            enviar(resp, 400, Map.of("error", "Id inválido"));
        } catch (SQLException e) {
            errorSql(resp, e);
        }
    }

    // ---------- Auxiliares ----------
    private Integer obtenerId(HttpServletRequest req) {
        String p = req.getPathInfo();
        if (p == null || p.equals("/")) return null;
        return Integer.parseInt(p.substring(1));
    }

    private void errorSql(HttpServletResponse resp, SQLException e) throws IOException {
        log("Error SQL", e);
        String estado = e.getSQLState() == null ? "" : e.getSQLState();
        if (estado.equals("23505")) enviar(resp, 409, Map.of("error", "Registro duplicado"));
        else if (estado.equals("23503")) enviar(resp, 409, Map.of("error", "Referencia inexistente o registro en uso"));
        else enviar(resp, 500, Map.of("error", "Error en la base de datos"));
    }

    private void enviar(HttpServletResponse resp, int status, Object cuerpo) throws IOException {
        resp.setStatus(status);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        mapper.writeValue(resp.getWriter(), cuerpo);
    }
}