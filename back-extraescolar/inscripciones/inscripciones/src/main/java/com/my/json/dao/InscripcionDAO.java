/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.my.json.dao;

import com.my.json.db.ConexionDB;
import com.my.json.modelos.Inscripcion;
import com.my.json.util.Sql;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
/**
 *
 * @author DELL
 */

public class InscripcionDAO {

    private Inscripcion mapear(ResultSet rs) throws SQLException {
        Inscripcion i = new Inscripcion();
        i.setIdInscripcion(rs.getInt("id_inscripcion"));
        i.setPeriodo(rs.getString("periodo"));
        i.setEstatus(rs.getString("estatus"));
        i.setCreditosObtenidos(Sql.entero(rs, "creditos_obtenidos"));
        i.setResultadoFinal(rs.getString("resultado_final"));
        i.setIdUsuario(rs.getInt("id_usuario"));
        i.setIdGrupo(rs.getInt("id_grupo"));
        return i;
    }

    private int bind(PreparedStatement ps, Inscripcion i) throws SQLException {
        ps.setString(1, i.getPeriodo());
        ps.setString(2, i.getEstatus());
        Sql.setEntero(ps, 3, i.getCreditosObtenidos());
        ps.setString(4, i.getResultadoFinal());
        Sql.setEntero(ps, 5, i.getIdUsuario());
        Sql.setEntero(ps, 6, i.getIdGrupo());
        return 6;
    }

    public List<Inscripcion> listar() throws SQLException {
        List<Inscripcion> lista = new ArrayList<>();
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM inscripciones ORDER BY id_inscripcion");
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) lista.add(mapear(rs));
        }
        return lista;
    }

    public Inscripcion buscarPorId(int id) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(
                     "SELECT * FROM inscripciones WHERE id_inscripcion = ?")) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) { return rs.next() ? mapear(rs) : null; }
        }
    }

    public Inscripcion crear(Inscripcion i) throws SQLException {
        String sql = "INSERT INTO inscripciones (periodo, estatus, creditos_obtenidos, resultado_final, "
                + "id_usuario, id_grupo) VALUES (?,?,?,?,?,?) RETURNING *";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            bind(ps, i);
            try (ResultSet rs = ps.executeQuery()) { rs.next(); return mapear(rs); }
        }
    }

    public boolean actualizar(int id, Inscripcion i) throws SQLException {
        String sql = "UPDATE inscripciones SET periodo=?, estatus=?, creditos_obtenidos=?, "
                + "resultado_final=?, id_usuario=?, id_grupo=? WHERE id_inscripcion = ?";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            int n = bind(ps, i);
            ps.setInt(n + 1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean actualizarParcial(int id, Inscripcion i) throws SQLException {
        String sql = "UPDATE inscripciones SET periodo=COALESCE(?,periodo), estatus=COALESCE(?,estatus), "
                + "creditos_obtenidos=COALESCE(?,creditos_obtenidos), "
                + "resultado_final=COALESCE(?,resultado_final), id_usuario=COALESCE(?,id_usuario), "
                + "id_grupo=COALESCE(?,id_grupo) WHERE id_inscripcion = ?";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            int n = bind(ps, i);
            ps.setInt(n + 1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean eliminar(int id) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("DELETE FROM inscripciones WHERE id_inscripcion = ?")) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        }
    }
}