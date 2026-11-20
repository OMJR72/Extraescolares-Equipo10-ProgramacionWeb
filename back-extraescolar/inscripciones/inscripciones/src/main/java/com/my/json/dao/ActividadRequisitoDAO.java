/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.my.json.dao;

import com.my.json.db.ConexionDB;
import com.my.json.modelos.ActividadRequisito;
import com.my.json.util.Sql;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
/**
 *
 * @author DELL
 */

public class ActividadRequisitoDAO {

    private static final String WHERE = " WHERE id_actividad = ? AND id_requisito = ?";

    private ActividadRequisito mapear(ResultSet rs) throws SQLException {
        ActividadRequisito ar = new ActividadRequisito();
        ar.setIdActividad(rs.getInt("id_actividad"));
        ar.setIdRequisito(rs.getInt("id_requisito"));
        return ar;
    }

    private int bind(PreparedStatement ps, ActividadRequisito ar) throws SQLException {
        Sql.setEntero(ps, 1, ar.getIdActividad());
        Sql.setEntero(ps, 2, ar.getIdRequisito());
        return 2;
    }

    public List<ActividadRequisito> listar() throws SQLException {
        List<ActividadRequisito> lista = new ArrayList<>();
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(
                     "SELECT * FROM actividad_requisito ORDER BY id_actividad, id_requisito");
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) lista.add(mapear(rs));
        }
        return lista;
    }

    public ActividadRequisito buscar(int idActividad, int idRequisito) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("SELECT * FROM actividad_requisito" + WHERE)) {
            ps.setInt(1, idActividad);
            ps.setInt(2, idRequisito);
            try (ResultSet rs = ps.executeQuery()) { return rs.next() ? mapear(rs) : null; }
        }
    }

    public ActividadRequisito crear(ActividadRequisito ar) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(
                     "INSERT INTO actividad_requisito (id_actividad, id_requisito) VALUES (?,?) RETURNING *")) {
            bind(ps, ar);
            try (ResultSet rs = ps.executeQuery()) { rs.next(); return mapear(rs); }
        }
    }

    public boolean actualizar(int idActividad, int idRequisito, ActividadRequisito ar) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(
                     "UPDATE actividad_requisito SET id_actividad=?, id_requisito=?" + WHERE)) {
            int n = bind(ps, ar);
            ps.setInt(n + 1, idActividad);
            ps.setInt(n + 2, idRequisito);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean actualizarParcial(int idActividad, int idRequisito, ActividadRequisito ar) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement(
                     "UPDATE actividad_requisito SET id_actividad=COALESCE(?,id_actividad), "
                     + "id_requisito=COALESCE(?,id_requisito)" + WHERE)) {
            int n = bind(ps, ar);
            ps.setInt(n + 1, idActividad);
            ps.setInt(n + 2, idRequisito);
            return ps.executeUpdate() > 0;
        }
    }

    public boolean eliminar(int idActividad, int idRequisito) throws SQLException {
        try (Connection con = ConexionDB.getConexion();
             PreparedStatement ps = con.prepareStatement("DELETE FROM actividad_requisito" + WHERE)) {
            ps.setInt(1, idActividad);
            ps.setInt(2, idRequisito);
            return ps.executeUpdate() > 0;
        }
    }
}