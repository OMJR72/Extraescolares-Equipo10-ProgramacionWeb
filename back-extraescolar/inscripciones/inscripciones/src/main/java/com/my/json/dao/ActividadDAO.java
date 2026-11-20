/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.my.json.dao;

import com.my.json.db.ConexionDB;
import com.my.json.modelos.Actividad;
import com.my.json.util.Sql;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
/**
 *
 * @author DELL
 */

public class ActividadDAO {

    private Actividad mapear(ResultSet rs) throws SQLException {
        Actividad a = new Actividad();
        a.setIdActividad(rs.getInt("id_actividad"));
        a.setNombre(rs.getString("nombre"));
        a.setCreditos(rs.getInt("creditos"));
        a.setIdTipoDeActividad(rs.getInt("id_tipo_de_actividad"));
        a.setIdCarrera(Sql.entero(rs, "id_carrera"));
        return a;
    }

    private int bind(PreparedStatement ps, Actividad a) throws SQLException {
        ps.setString(1, a.getNombre());
        Sql.setEntero(ps, 2, a.getCreditos());
        Sql.setEntero(ps, 3, a.getIdTipoDeActividad());
        Sql.setEntero(ps, 4, a.getIdCarrera());
        return 4;
    }

    public List<Actividad> listar() throws SQLException {
        List<Actividad> lista = new ArrayList<>();
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM actividades ORDER BY id_actividad");
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) lista.add(mapear(rs));
        }
        return lista;
    }

    public Actividad buscarPorId(int id) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM actividades WHERE id_actividad = ?")) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) { return rs.next() ? mapear(rs) : null; }
        }
    }

    public Actividad crear(Actividad a) throws SQLException {
        String sql = "INSERT INTO actividades (nombre, creditos, id_tipo_de_actividad, id_carrera) "
                + "VALUES (?,?,?,?) RETURNING *";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            bind(ps, a);
            try (ResultSet rs = ps.executeQuery()) { rs.next(); return mapear(rs); }
        }
    }

    public boolean actualizar(int id, Actividad a) throws SQLException {
        String sql = "UPDATE actividades SET nombre=?, creditos=?, id_tipo_de_actividad=?, id_carrera=? "
                + "WHERE id_actividad = ?";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            int n = bind(ps, a);
            ps.setInt(n + 1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean actualizarParcial(int id, Actividad a) throws SQLException {
        String sql = "UPDATE actividades SET nombre=COALESCE(?,nombre), creditos=COALESCE(?,creditos), "
                + "id_tipo_de_actividad=COALESCE(?,id_tipo_de_actividad), id_carrera=COALESCE(?,id_carrera) "
                + "WHERE id_actividad = ?";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            int n = bind(ps, a);
            ps.setInt(n + 1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean eliminar(int id) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("DELETE FROM actividades WHERE id_actividad = ?")) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        }
    }
}