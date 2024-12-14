/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package isi.deso.DTO;

import isi.deso.model.Categoria;
import isi.deso.model.Vendedor;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 *
 * @author ivogo
 */
@Data
public class ItemMenuDTO {

    private String nombre;
    private Categoria categoria;
    private double precio;
    private String desc;
    private String tipo;
    private boolean esVegano;
    private double gradAlcohol;
    private int tamanioBebida;
    private boolean aptoVegetariano;
    private boolean aptoCeliaco;
    private int calorias;
    private int idItem;
    @JsonIgnore
    private Vendedor vendedor;

    public ItemMenuDTO() {
    };

}