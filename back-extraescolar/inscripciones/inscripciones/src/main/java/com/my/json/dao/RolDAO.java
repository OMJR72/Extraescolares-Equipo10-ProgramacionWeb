/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.my.json.dao;

import com.my.json.db.ConexionDB;
import com.my.json.modelos.Rol;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
/**
 *
 * @author DELL
 */
public class RolDAO {

    private Rol mapear(ResultSet rs) throws SQLException {
        Rol r = new Rol();
        r.setIdRol(rs.getInt("id_rol"));
        r.setNombre(rs.getString("nombre"));
        return r;
    }

    private int bind(PreparedStatement ps, Rol r) throws SQLException {
        ps.setString(1, r.getNombre());
        return 1;
    }

    public List<Rol> listar() throws SQLException {
        List<Rol> lista = new ArrayList<>();
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM roles ORDER BY id_rol");
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) lista.add(mapear(rs));
        }
        return lista;
    }

    public Rol buscarPorId(int id) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM roles WHERE id_rol = ?")) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) { return rs.next() ? mapear(rs) : null; }
        }
    }

    public Rol crear(Rol r) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("INSERT INTO roles (nombre) VALUES (?) RETURNING *")) {
            bind(ps, r);
            try (ResultSet rs = ps.executeQuery()) { rs.next(); return mapear(rs); }
        }
    }

    public boolean actualizar(int id, Rol r) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("UPDATE roles SET nombre = ? WHERE id_rol = ?")) {
            int n = bind(ps, r);
            ps.setInt(n + 1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean actualizarParcial(int id, Rol r) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(
                     "UPDATE roles SET nombre = COALESCE(?, nombre) WHERE id_rol = ?")) {
            int n = bind(ps, r);
            ps.setInt(n + 1, id);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean eliminar(int id) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("DELETE FROM roles WHERE id_rol = ?")) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        }
    }
}