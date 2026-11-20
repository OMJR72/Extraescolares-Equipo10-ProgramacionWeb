/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.my.json.modelos;

/**
 *
 * @author DELL
 */
public class Actividad {
    private Integer idActividad;
    private String nombre;
    private Integer creditos;
    private Integer idTipoDeActividad;
    private Integer idCarrera;

    public Actividad() {}

    public Integer getIdActividad() { return idActividad; }
    public void setIdActividad(Integer idActividad) { this.idActividad = idActividad; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public Integer getCreditos() { return creditos; }
    public void setCreditos(Integer creditos) { this.creditos = creditos; }
    public Integer getIdTipoDeActividad() { return idTipoDeActividad; }
    public void setIdTipoDeActividad(Integer idTipoDeActividad) { this.idTipoDeActividad = idTipoDeActividad; }
    public Integer getIdCarrera() { return idCarrera; }
    public void setIdCarrera(Integer idCarrera) { this.idCarrera = idCarrera; }
}