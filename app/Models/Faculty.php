<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Faculty extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'faculty_id',
        'department',
        'designation',
        'specialization',
    ];

    /**
     * Get the user that owns the faculty profile.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
