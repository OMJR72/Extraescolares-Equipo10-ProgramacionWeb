/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.my.json.dao;

import com.my.json.db.ConexionDB;
import com.my.json.modelos.Carrera;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author DELL
 */
public class CarreraDAO {

    private Carrera mapear(ResultSet rs) throws SQLException {
        Carrera c = new Carrera();
        c.setIdCarrera(rs.getInt("id_carrera"));
        c.setNombre(rs.getString("nombre"));
        return c;
    }

    // READ (todos)
    public List<Carrera> listar() throws SQLException {
        String sql = "SELECT id_carrera, nombre FROM carreras ORDER BY id_carrera";
        List<Carrera> lista = new ArrayList<>();
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) lista.add(mapear(rs));
        }
        return lista;
    }

    // READ (uno)
    public Carrera buscarPorId(int id) throws SQLException {
        String sql = "SELECT id_carrera, nombre FROM carreras WHERE id_carrera = ?";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next() ? mapear(rs) : null;
            }
        }
    }

    // CREATE
    public Carrera crear(Carrera c) throws SQLException {
        String sql = "INSERT INTO carreras (nombre) VALUES (?) RETURNING id_carrera, nombre";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, c.getNombre());
            try (ResultSet rs = ps.executeQuery()) {
                rs.next();
                return mapear(rs);
            }
        }
    }

    // UPDATE total (PUT)
    public boolean actualizar(int id, Carrera c) throws SQLException {
        String sql = "UPDATE carreras SET nombre = ? WHERE id_carrera = ?";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, c.getNombre());
            ps.setInt(2, id);
            return ps.executeUpdate() > 0;
        }
    }

    // UPDATE parcial (PATCH): solo cambia lo que venga distinto de null
    public boolean actualizarParcial(int id, Carrera c) throws SQLException {
        String sql = "UPDATE carreras SET nombre = COALESCE(?, nombre) WHERE id_carrera = ?";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setString(1, c.getNombre());
            ps.setInt(2, id);
            return ps.executeUpdate() > 0;
        }
    }

    // DELETE
    public boolean eliminar(int id) throws SQLException {
        String sql = "DELETE FROM carreras WHERE id_carrera = ?";
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {
            ps.setInt(1, id);
            return ps.executeUpdate() > 0;
        }
    }
}