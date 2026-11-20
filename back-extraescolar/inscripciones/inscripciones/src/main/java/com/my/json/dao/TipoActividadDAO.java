/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.my.json.dao;


import com.my.json.db.ConexionDB;
import com.my.json.modelos.TipoActividad;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
/**
 *
 * @author DELL
 */
public class TipoActividadDAO {

    private TipoActividad mapear(ResultSet rs) throws SQLException {
        TipoActividad t = new TipoActividad();
        t.setIdTipoDeActividad(rs.getInt("id_tipo_de_actividad"));
        t.setNombre(rs.getString("nombre"));
        return t;
    }

    private int bind(PreparedStatement ps, TipoActividad t) throws SQLException {
        ps.setString(1, t.getNombre());
        return 1;
    }

    public List<TipoActividad> listar() throws SQLException {
        List<TipoActividad> lista = new ArrayList<>();
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM tipos_actividad ORDER BY id_tipo_de_actividad");
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) lista.add(mapear(rs));
        }
        return lista;
    }

    public TipoActividad buscarPorId(int id) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(
                     "SELECT * FROM tipos_actividad WHERE id_tipo_de_actividad = ?")) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) { return rs.next() ? mapear(rs) : null; }
        }
    }

    public TipoActividad crear(TipoActividad t) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(
                     "INSERT INTO tipos_actividad (nombre) VALUES (?) RETURNING *")) {
            bind(ps, t);
            try (ResultSet rs = ps.executeQuery()) { rs.next(); return mapear(rs); }
        }
    }

    public boolean actualizar(int id, TipoActividad t) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(
                     "UPDATE tipos_actividad SET nombre = ? WHERE id_tipo_de_actividad = ?")) {
            int n = bind(ps, t);
            ps.setInt(n + 1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean actualizarParcial(int id, TipoActividad t) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(
                     "UPDATE tipos_actividad SET nombre = COALESCE(?, nombre) WHERE id_tipo_de_actividad = ?")) {
            int n = bind(ps, t);
            ps.setInt(n + 1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean eliminar(int id) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(
                     "DELETE FROM tipos_actividad WHERE id_tipo_de_actividad = ?")) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        }
    }
}
